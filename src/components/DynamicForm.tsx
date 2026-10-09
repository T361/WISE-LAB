import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Plus, Send, Trash2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Reveal } from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { FieldDef, FormSchema, TableColumn } from '@/lib/forms/types'
import { allFields, buildSubmissionPayload, isFieldVisible } from '@/lib/forms/submission'
import { submitApplication } from '@/lib/forms/submitApplication'
import {
  tColumnLabel,
  tFieldHelpText,
  tFieldLabel,
  tFieldPatternMessage,
  tFieldPlaceholder,
  tOptionLabel,
  tSectionDescription,
  tSectionTitle,
  tSubmitLabel,
  tSuccessBody,
  tSuccessTitle,
} from '@/lib/forms/i18nKeys'

type Values = Record<string, unknown>
type Errors = Record<string, string>

/**
 * Renders bilingual text (English / Urdu).
 *
 * Separator priority:
 *  1. First blank line (\n\n) — used for multi-paragraph blocks like the
 *     declaration, where each language has several numbered points.
 *  2. First single newline (\n) — used for short labels ("Q1. Full name\nمکمل نام").
 *
 * Each block is rendered with whitespace-pre-wrap so internal \n line-breaks
 * display correctly. The Urdu block is right-aligned with dir="rtl".
 */
function BilingualText({ text, className }: { text: string; className?: string }) {
  const doubleNl = text.indexOf('\n\n')
  const singleNl = text.indexOf('\n')

  // Pick the split point: prefer blank-line separator when available
  const splitAt = doubleNl !== -1 ? doubleNl : singleNl
  const skipLen  = doubleNl !== -1 ? 2 : 1

  if (splitAt === -1) return <span className={className}>{text}</span>

  const english = text.slice(0, splitAt).trim()
  const urdu    = text.slice(splitAt + skipLen).trim()

  return (
    <span className={`block ${className ?? ''}`}>
      <span className="block whitespace-pre-wrap text-left">{english}</span>
      {urdu && (
        <span
          dir="rtl"
          lang="ur"
          className="mt-1 block whitespace-pre-wrap text-right font-normal"
          style={{ fontFamily: "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', sans-serif" }}
        >
          {urdu}
        </span>
      )}
    </span>
  )
}


function emptyTableRow(columns: TableColumn[]) {
  const row: Record<string, string> = {}
  for (const c of columns) row[c.key] = ''
  return row
}

interface DynamicFormProps {
  schema: FormSchema
}

export function DynamicForm({ schema }: DynamicFormProps) {
  const { t } = useTranslation()
  const fields = useMemo(() => allFields(schema), [schema])
  const [values, setValues] = useState<Values>({})
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const setValue = (name: string, val: unknown) => {
    setValues((prev) => ({ ...prev, [name]: val }))
  }

  const validate = (): boolean => {
    const e: Errors = {}
    for (const field of fields) {
      if (!isFieldVisible(field, values)) continue
      const val = values[field.name]

      if (field.type === 'table') {
        const rows = (val as Record<string, string>[] | undefined) ?? []
        const minRows = field.minRows ?? 0
        if (field.required && rows.length < Math.max(minRows, 1)) {
          e[field.name] = t('form.tableMinRowsError')
          continue
        }
        const columns = field.columns ?? []
        const rowInvalid = rows.some((row) =>
          columns.some((c) => c.required && !String(row[c.key] ?? '').trim())
        )
        if (rowInvalid) e[field.name] = t('form.tableIncompleteError')
        continue
      }

      if (field.type === 'consent') {
        if (field.required && val !== true) e[field.name] = t('form.consentRequiredError')
        continue
      }

      if (field.required && (val === undefined || val === null || String(val).trim() === '')) {
        e[field.name] = t('form.requiredError')
        continue
      }

      // checkbox: require at least one selection
      if (field.type === 'checkbox' && field.required) {
        const arr = val as string[] | undefined
        if (!arr || arr.length === 0) {
          e[field.name] = t('form.requiredError')
          continue
        }
      }

      if (field.pattern && val && !field.pattern.test(String(val))) {
        e[field.name] = tFieldPatternMessage(t, schema, field) ?? t('form.invalidValueError')
      }
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    setSubmitError(null)
    if (!validate()) {
      window.alert('Please fill out all required fields and correct any errors before submitting.\n\nبراہ کرم جمع کرانے سے پہلے تمام ضروری خانے پُر کریں اور غلطیاں دور کریں۔')
      
      // Auto-scroll to the first field with an error
      setTimeout(() => {
        const firstErrorEl = document.querySelector('[aria-invalid="true"]')
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 50)
      return
    }

    setSubmitting(true)
    try {
      const payload = buildSubmissionPayload(schema, values)
      await submitApplication(payload)
      setSent(true)
    } catch {
      setSubmitError(t('form.submitError'))
    } finally {
      setSubmitting(false)
    }
  }

  const firstNameKey = fields.find((f) =>
    /name/i.test(f.name) && !/business|startup|organization/i.test(f.name)
  )?.name
  const firstName = firstNameKey
    ? String(values[firstNameKey] ?? '').split(' ')[0]
    : ''

  return (
    <Reveal delay={0.1}>
      <div className="relative rounded-3xl border border-plum/10 bg-white p-7 shadow-card md:p-9">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              role="status"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[420px] flex-col items-center justify-center text-center"
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 240, damping: 16, delay: 0.1 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--track-accent)]/12"
              >
                <CheckCircle2 className="h-10 w-10 text-[var(--track-accent)]" />
              </motion.div>
              <h3 className="mt-6 font-display text-2xl font-bold text-black">
                {tSuccessTitle(t, schema).replace(
                  '{firstName}',
                  firstName || t('form.successFallbackName')
                )}
              </h3>
              <p className="mt-2 max-w-xs text-black">{tSuccessBody(t, schema)}</p>
              <button
                type="button"
                onClick={() => {
                  setSent(false)
                  setValues({})
                  setErrors({})
                }}
                className="mt-8 text-sm font-semibold text-black underline underline-offset-4 hover:text-black/70"
              >
                {t('form.submitAnother')}
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              noValidate
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              {schema.sections.map((section) => (
                <div key={section.id} className="space-y-5">
                  <div>
              <h3 className="font-display text-lg font-semibold text-black">
                      <BilingualText text={tSectionTitle(t, schema, section)} />
                    </h3>
                    {section.description && (
                      <div className="mt-1 text-sm text-black">
                        <BilingualText text={tSectionDescription(t, schema, section) || ''} />
                      </div>
                    )}
                  </div>
                  {section.fields.map((field) =>
                    isFieldVisible(field, values) ? (
                      <FormField
                        key={field.name}
                        schema={schema}
                        field={field}
                        value={values[field.name]}
                        error={errors[field.name]}
                        onChange={(val) => setValue(field.name, val)}
                      />
                    ) : null
                  )}
                </div>
              ))}

              {submitError && (
                <p className="text-[13px] font-medium text-destructive">{submitError}</p>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={submitting}
                style={{ background: 'var(--track-primary)', color: 'var(--track-ink)' }}
              >
                {submitting ? t('form.sending') : tSubmitLabel(t, schema)}
                <Send className="h-4 w-4" />
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

function FormField({
  schema,
  field,
  value,
  error,
  onChange,
}: {
  schema: FormSchema
  field: FieldDef
  value: unknown
  error?: string
  onChange: (val: unknown) => void
}) {
  const { t } = useTranslation()
  if (field.type === 'table') {
    return (
      <TableField
        schema={schema}
        field={field}
        value={(value as Record<string, string>[]) ?? []}
        error={error}
        onChange={onChange}
      />
    )
  }

  if (field.type === 'consent') {
    return (
      <div className="space-y-2">
        <div className="flex items-start gap-3">
          <Checkbox
            id={field.name}
            checked={value === true}
            onCheckedChange={(checked) => onChange(checked === true)}
            aria-invalid={!!error}
            className="mt-0.5"
          />
          <div className="space-y-1 mt-0.5">
            <Label htmlFor={field.name} className="normal-case text-[14px] font-semibold leading-relaxed text-black">
              <BilingualText text={tFieldLabel(t, schema, field)} />
            </Label>
            {field.helpText && (
              <div className="text-[13px] text-black">
                <BilingualText text={field.helpText} />
              </div>
            )}
          </div>
        </div>
        <ErrorMessage error={error} />
      </div>
    )
  }

  const placeholder = tFieldPlaceholder(t, schema, field)
  const helpText = tFieldHelpText(t, schema, field)

  return (
    <div className="space-y-2">
      <Label htmlFor={field.name} className="leading-snug">
        <BilingualText text={tFieldLabel(t, schema, field)} />
        {field.required && <span className="text-[var(--track-accent)]"> *</span>}
      </Label>
      {helpText && (
        <div className="text-[13px] text-black">
          <BilingualText text={helpText} />
        </div>
      )}

      {field.type === 'textarea' && (() => {
        const text = (value as string) ?? ''
        // count words only when a word-limit pattern exists
        const hasWordLimit = field.pattern && field.patternMessage?.toLowerCase().includes('word')
        const wordCount = hasWordLimit ? text.trim().split(/\s+/).filter(Boolean).length : 0
        const atMin = wordCount >= 10
        const atMax = wordCount <= 300
        return (
          <div className="space-y-1">
            <Textarea
              id={field.name}
              value={text}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              maxLength={field.maxLength}
              aria-invalid={!!error}
              rows={5}
            />
            {hasWordLimit && (
              <p className={`text-right text-[12px] tabular-nums transition-colors ${
                text.trim() === '' ? 'text-black/40'
                : (!atMin || !atMax) ? 'text-destructive'
                : 'text-emerald-600'
              }`}>
                {wordCount} / 10–300 words
              </p>
            )}
          </div>
        )
      })()}

      {field.type === 'select' && (
        <Select value={(value as string) ?? ''} onValueChange={onChange}>
          <SelectTrigger id={field.name} aria-invalid={!!error}>
            <SelectValue placeholder={placeholder ?? t('form.chooseOne')} />
          </SelectTrigger>
          <SelectContent>
            {field.options?.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {tOptionLabel(t, schema, field, opt.value, opt.label)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {field.type === 'radio' && (
        <RadioGroup
          value={(value as string) ?? ''}
          onValueChange={onChange}
          aria-invalid={!!error}
        >
          {field.options?.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm font-medium text-black">
              <RadioGroupItem value={opt.value} id={`${field.name}-${opt.value}`} />
              {tOptionLabel(t, schema, field, opt.value, opt.label)}
            </label>
          ))}
        </RadioGroup>
      )}

      {field.type === 'checkbox' && field.options && (
        <div className="space-y-3" aria-invalid={!!error}>
          {field.options.map((opt) => {
            const isChecked = Array.isArray(value) ? value.includes(opt.value) : false
            return (
              <label key={opt.value} className="flex items-start gap-3 text-[14px] font-normal leading-relaxed text-black">
                <Checkbox
                  id={`${field.name}-${opt.value}`}
                  checked={isChecked}
                  onCheckedChange={(checked) => {
                    const current = Array.isArray(value) ? [...value] : []
                    if (checked) {
                      onChange([...current, opt.value])
                    } else {
                      onChange(current.filter(v => v !== opt.value))
                    }
                  }}
                  className="mt-0.5"
                />
                <span className="mt-0.5">{tOptionLabel(t, schema, field, opt.value, opt.label)}</span>
              </label>
            )
          })}
        </div>
      )}

      {['text', 'email', 'tel', 'number', 'url', 'date'].includes(field.type) && (() => {
        const text = (value as string) ?? ''
        return (
          <div className="space-y-1">
            <Input
              id={field.name}
              type={field.type}
              value={text}
              onChange={(e) => {
                const raw = e.target.value
                // strip everything except digits when numericOnly is set
                const next = field.numericOnly ? raw.replace(/\D/g, '') : raw
                onChange(next)
              }}
              onPaste={field.numericOnly ? (e) => {
                e.preventDefault()
                const pasted = e.clipboardData.getData('text').replace(/\D/g, '')
                const current = text
                const el = e.currentTarget
                const start = el.selectionStart ?? current.length
                const end = el.selectionEnd ?? current.length
                const next = current.slice(0, start) + pasted + current.slice(end)
                const capped = field.maxLength ? next.slice(0, field.maxLength) : next
                onChange(capped)
              } : undefined}
              onKeyDown={field.numericOnly ? (e) => {
                // allow: backspace, delete, tab, escape, enter, arrows, home, end, ctrl/cmd combos
                const allowedKeys = ['Backspace','Delete','Tab','Escape','Enter','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End']
                if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) return
                // block anything that isn't a digit
                if (!/^[0-9]$/.test(e.key)) e.preventDefault()
              } : undefined}
              placeholder={placeholder}
              maxLength={field.maxLength}
              inputMode={field.inputMode}
              aria-invalid={!!error}
            />
            {field.numericOnly && field.maxLength && (
              <p className={`text-right text-[12px] tabular-nums transition-colors ${
                text.length === 0 ? 'text-black/40'
                : text.length < field.maxLength ? 'text-destructive'
                : 'text-emerald-600'
              }`}>
                {text.length} / {field.maxLength} digits
              </p>
            )}
          </div>
        )
      })()}

      <ErrorMessage error={error} />
    </div>
  )
}

function TableField({
  schema,
  field,
  value,
  error,
  onChange,
}: {
  schema: FormSchema
  field: FieldDef
  value: Record<string, string>[]
  error?: string
  onChange: (val: Record<string, string>[]) => void
}) {
  const { t } = useTranslation()
  const columns = field.columns ?? []
  const rows = value.length > 0 ? value : [emptyTableRow(columns)]

  const updateRow = (idx: number, key: string, val: string) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, [key]: val } : r))
    onChange(next)
  }
  const addRow = () => onChange([...rows, emptyTableRow(columns)])
  const removeRow = (idx: number) => {
    const next = rows.filter((_, i) => i !== idx)
    onChange(next.length > 0 ? next : [emptyTableRow(columns)])
  }

  return (
    <div className="space-y-3">
      <Label>
        {tFieldLabel(t, schema, field)}
        {field.required && <span className="text-[var(--track-accent)]"> *</span>}
      </Label>
      <div className="space-y-4">
        {rows.map((row, idx) => (
          <div
            key={idx}
            className="grid gap-3 rounded-2xl border border-plum/10 bg-plum/[0.02] p-4 sm:grid-cols-2"
          >
            {columns.map((col) => (
              <div key={col.key} className="space-y-1.5">
                <Label htmlFor={`${field.name}-${idx}-${col.key}`} className="text-[11px]">
                  {tColumnLabel(t, schema, field, col)}
                </Label>
                <Input
                  id={`${field.name}-${idx}-${col.key}`}
                  type={col.type === 'number' ? 'number' : 'text'}
                  value={row[col.key] ?? ''}
                  onChange={(e) => updateRow(idx, col.key, e.target.value)}
                  placeholder={col.placeholder}
                />
              </div>
            ))}
            {rows.length > 1 && (
              <button
                type="button"
                onClick={() => removeRow(idx)}
                className="flex items-center gap-1.5 text-[13px] font-semibold text-destructive sm:col-span-2 sm:justify-self-start"
              >
                <Trash2 className="h-3.5 w-3.5" /> {t('form.removeRow')}
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addRow}
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--track-accent)]"
      >
        <Plus className="h-3.5 w-3.5" /> {t('form.addRow')}
      </button>
      <ErrorMessage error={error} />
    </div>
  )
}

function ErrorMessage({ error }: { error?: string }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="text-[13px] font-medium text-destructive"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  )
}
