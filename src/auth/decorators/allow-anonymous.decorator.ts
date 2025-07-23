export const AllowAnonymous = () => {
  return (
    target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    console.log('this is logged from the decorator:' + propertyKey);
  };
};
