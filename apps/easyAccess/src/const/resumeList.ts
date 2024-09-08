import { ResumeType } from 'apps/easyAccess/src/types/resume/resumes';
import { uniqueId } from 'lodash-es';
import { ResumeDataType } from '../types/resume/resume-data';

export const DEFAULT_RESuME_DATA: ResumeDataType = {
  basics: {
    name: "John Doe",
    headline: "Creative and Innovative Web Developer",
    email: "john.doe@gmail.com",
    phone: "(555) 123-4567",
    location: "江苏 南京",
    url: {
      label: "",
      href: "https://johndoe.me/",
    },
    customFields: [],
    picture: {
      url: "https://i.imgur.com/HgwyOuJ.jpg",
      size: 120,
      aspectRatio: 1,
      borderRadius: 0,
      effects: {
        hidden: false,
        border: false,
        grayscale: false,
      },
    },
  },
  sections: {
    summary: {
      name: "Summary",
      columns: 1,
      separateLinks: true,
      visible: true,
      id: "summary",
      content:
        "<p>Innovative Web Developer with 5 years of experience in building impactful and user-friendly websites and applications. Specializes in <strong>front-end technologies</strong> and passionate about modern web standards and cutting-edge development techniques. Proven track record of leading successful projects from concept to deployment.</p>",
    },
    awards: {
      name: "Awards",
      columns: 1,
      separateLinks: true,
      visible: true,
      id: "awards",
      items: [],
      content: '',
    }
  },
    metadata: {
    template: "default",
    layout: [
      [
        ["summary",],
        [
          "awards",
        ],
      ],
    ],
    css: {
      value: ".section {\n\toutline: 1px solid #000;\n\toutline-offset: 4px;\n}",
      visible: false,
    },
    page: {
      margin: 14,
      format: "a4",
      options: {
        breakLine: true,
        pageNumbers: true,
      },
    },
    theme: {
      background: "#ffffff",
      text: "#000000",
      primary: "#ca8a04",
    },
    typography: {
      font: {
        family: "Merriweather",
        subset: "latin",
        variants: ["regular"],
        size: 13,
      },
      lineHeight: 1.75,
      hideIcons: false,
      underlineLinks: true,
    },
    notes: "",
  },
}


export const DEFAULT_RESUME: ResumeType = {
  createdAt: '2024-08-01',
  id: uniqueId().toString(),
  locked: false,
  visibility: "public",
  slug: '我的简历',
  title: '我的简历',
  updatedAt: '2024-09-01',
  data: DEFAULT_RESuME_DATA
}
