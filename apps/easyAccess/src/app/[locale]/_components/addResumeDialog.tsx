
'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "apps/easyAccess/libs/ui/dialog"
import { Input } from "apps/easyAccess/libs/ui/input"
import { Label } from "apps/easyAccess/libs/ui/label"
import { motion } from "framer-motion"

import { useResumeStore } from 'apps/easyAccess/src/store/resume/store';
import { buttonVariants } from "apps/easyAccess/libs/ui/variants/button"
import { useState } from "react"
import { ResumeType } from "apps/easyAccess/src/types/resume/resumes"
import { useTranslations } from "next-intl"

export function AddResumeDialog() {
  const t = useTranslations('dashboard.resumes')
  const [open, setOpen] = useState(false)
  const [addResume] = useResumeStore(s => [s.addResume])
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOpen(false)
    // @ts-ignore
    const formData: Iterable = new FormData(e.target)
    const data: Partial<ResumeType> = Object.fromEntries(formData.entries())
    addResume(data)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={buttonVariants({ variant: "default", size: "default", className: "w-30" })}
        >
          {t('add.title')}
        </motion.button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('add.title')}</DialogTitle>
          <DialogDescription>
            {t('add.description')}
          </DialogDescription>
        </DialogHeader>

        <form className="mt-2 space-y-2" onSubmit={handleSubmit}>
          <Label
            htmlFor="title"
            className="text-xs font-medium text-gray-700 dark:text-gray-400"
          >
            {t('add.name')}
          </Label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder={t('add.placeholder')}
            autoComplete="given-name"
          />
          <DialogFooter>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={buttonVariants({ variant: "default", size: "default", className: "w-30" })}
              type="submit"
            >
              {t('add.save')}
            </motion.button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
