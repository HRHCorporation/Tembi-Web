import { container, DependencyContainer } from "tsyringe";

const InitDI = (): DependencyContainer => {
  const di = container.createChildContainer();

  return di;
};

const di = InitDI();

export default di;