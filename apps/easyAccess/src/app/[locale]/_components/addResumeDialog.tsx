
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

export function AddResumeDialog() {
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
          新增简历
        </motion.button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>新增简历</DialogTitle>
          <DialogDescription>
            简历名称用于分类,请与其他简历名称不要重复.
          </DialogDescription>
        </DialogHeader>

        <form className="mt-2 space-y-2" onSubmit={handleSubmit}>
            <Label
              htmlFor="title"
              className="text-xs font-medium text-gray-700 dark:text-gray-400"
            >
              简历名称
            </Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="这里填写新建简历名称"
              autoComplete="given-name"
            />
          <DialogFooter>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={buttonVariants({ variant: "default", size: "default", className: "w-30" })}
              type="submit"
            >
              新增保存
            </motion.button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
