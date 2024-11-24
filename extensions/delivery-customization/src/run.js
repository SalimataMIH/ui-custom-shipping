// @ts-check
// Use JSDoc annotations for type safety
/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 * @typedef {import("../generated/api").Operation} Operation
 */
// The configured entrypoint for the 'purchase.delivery-customization.run' extension target
/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  // Filter out the "Click and Collect" option

  console.log("Delivery options:", input.cart.deliveryGroups);
  let operations = input.cart.deliveryGroups

    .flatMap((group) => group.deliveryOptions)
    .filter(
      (option) =>
        option.title &&
        !option.title.toUpperCase().startsWith("CLICK AND COLLECT")
    )
    .map(
      (option) =>
        /** @type {Operation} */ ({
          rename: {
            deliveryOptionHandle: option.handle,
            title: option.title,
          },
        })
    );

  return {
    operations: operations,
  };
}
