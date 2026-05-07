import { TaskEither } from "fp-ts/lib/TaskEither";
import BaseFailure from '../failure/base.failure';
import { Either } from "fp-ts/lib/Either";

type ApiTask<ResponseType> = TaskEither<
  BaseFailure<unknown>,
  ResponseType
>;
export type ApiEither<ResponseType> = Either<
  BaseFailure<unknown>,
  ResponseType
>;

export default ApiTask;