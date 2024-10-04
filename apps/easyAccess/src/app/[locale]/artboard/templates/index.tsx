

import { Template } from "@easy-access/utils";
import { Design } from "./Design";
import { Azurill } from "./azurill";

export const getTemplate = (template: Template) => {
  switch (template) {
    case "design": {
      return Design;
    }
    case "azurill": {
      return Azurill;
    }
    default: {
      return Azurill;
    }
  }
};
