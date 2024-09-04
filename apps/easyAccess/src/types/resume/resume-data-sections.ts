import { SectionData, SectionsKey } from "apps/easyAccess/src/types/resume/sections/base";

type ExtractId<T> = T extends { id: infer ID } ? ID : never;

// 然后，定义一个类型，它将根据 SectionData 中的 id 来映射类型
export type ResumeDataSections<T extends SectionData> = {
    [K in ExtractId<T>]: T extends { id: K } ? T : never;
  };