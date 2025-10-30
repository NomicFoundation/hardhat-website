import { slug as generateSlug } from "github-slugger";
import * as descriptors from "../../node_modules/@nomicfoundation/hardhat-errors/dist/src/descriptors.js";

interface ErrorDescriptor {
  number: number;
  websiteTitle: string;
  websiteDescription: string;
}

interface ErrorCategories {
  [packageName: string]: {
    min: number;
    max: number;
    pluginId: string | undefined;
    websiteTitle: string;
    CATEGORIES: {
      [categoryName: string]: {
        min: number;
        max: number;
        websiteSubTitle: string;
      };
    };
  };
}

interface ErrorsDescriptors {
  [packageName: string]: {
    [categoryName: string]: {
      [errorName: string]: ErrorDescriptor;
    };
  };
}

async function loadErrorDescriptors(): Promise<{
  ERROR_CATEGORIES: ErrorCategories;
  ERRORS: ErrorsDescriptors;
}> {
  return descriptors;
}

export interface HardhatError {
  subtitle: string;
  categories: Array<{
    subtitle: string;
    errors: Array<{
      code: number;
      slug: string;
      title: string;
      description: string;
    }>;
  }>;
}

export async function getErrors(): Promise<HardhatError[]> {
  const errors = [];
  const { ERROR_CATEGORIES, ERRORS } = await loadErrorDescriptors();

  for (const [packageName, packageCategory] of Object.entries(
    ERROR_CATEGORIES,
  )) {
    const packageSubTitle = `${packageCategory.websiteTitle} errors`;
    const packageErrors: HardhatError = {
      subtitle: packageSubTitle,
      categories: [],
    };

    for (const [categoryName, category] of Object.entries(
      packageCategory.CATEGORIES,
    )) {
      const categoryErrors: HardhatError["categories"][number] = {
        subtitle: category.websiteSubTitle,
        errors: [],
      };

      for (const error of Object.values(
        ERRORS[packageName]?.[categoryName] ?? {},
      )) {
        const title = `HHE${error.number}: ${error.websiteTitle}`;
        categoryErrors.errors.push({
          code: error.number,
          slug: generateSlug(title),
          title: `HHE${error.number}: ${error.websiteTitle}`,
          description: error.websiteDescription,
        });
      }

      packageErrors.categories.push(categoryErrors);
    }

    errors.push(packageErrors);
  }

  return errors;
}
