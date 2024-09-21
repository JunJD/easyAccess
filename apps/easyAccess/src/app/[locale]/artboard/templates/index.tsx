

import { Template } from "@easy-access/utils";
import { Design } from "./Design";

export const getTemplate = (template: Template) => {
  switch (template) {
    case "design": {
      return Design;
    }
    default: {
      return Design;
    }
  }
};
