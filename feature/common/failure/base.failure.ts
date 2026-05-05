import { isServer } from "@/bootstrap/helpers/global-helper";
import { metadata } from '../../../app/layout';

export default abstract class BaseFailure<META_DATA> {
  namespace: string;
  message: string;
  metadata: META_DATA | undefined;

  constructor(message: string, namespace: string, metadata?: META_DATA) {
    this.message = message;
    this.metadata = metadata ?? undefined;
    this.namespace = namespace;
    this.logHandler();
  }

  toPlainObject(): BaseFailure<META_DATA> {
    return {
      message: this.message,
      metadata: this.metadata,
    } as BaseFailure<META_DATA>;
  }

  private logHandler() {
    if (isServer) {
      console.log(
        `Error happened in ${this.namespace} namespace, langKey is: ${this.message}, metadata: ${JSON.stringify(this.metadata)}`,
      );
    }
  }

}