export const transformSnakeCaseToCamelCase = (
  snakeObj: Record<string, any>
): Record<string, any> => {
  const transform = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(transform); // Recursively transform each item in the array
    }

    if (obj && typeof obj === "object") {
      return Object.keys(obj).reduce(
        (camelCaseObj: Record<string, any>, key: string) => {
          let camelKey = key.replace(/_([a-z])/g, (_, letter) =>
            letter.toUpperCase()
          );
          camelKey = camelKey.charAt(0).toLowerCase() + camelKey.slice(1);
          camelCaseObj[camelKey] = transform(obj[key]); // Recursively transform the value
          return camelCaseObj;
        },
        {}
      );
    }

    return obj; // Return the value as is for non-object types
  };

  return transform(snakeObj);
};

export const transformCamelCaseToSnakeCase = (
  camelObj: Record<string, any>
): Record<string, any> => {
  const transform = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(transform); // Recursively transform each item in the array
    }

    if (obj && typeof obj === "object") {
      return Object.keys(obj).reduce(
        (snakeCaseObj: Record<string, any>, key: string) => {
          const snakeKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
          snakeCaseObj[snakeKey] = transform(obj[key]); // Recursively transform the value
          return snakeCaseObj;
        },
        {}
      );
    }

    return obj; // Return the value as is for non-object types
  };

  return transform(camelObj);
};
