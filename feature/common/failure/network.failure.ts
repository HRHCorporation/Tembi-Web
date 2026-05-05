
import BaseFailure from "./base.failure";
import commonLangKey, { commonLangNs } from "../lang-keys/common.lang-key";

export default class NetworkFailure<META_DATA> extends BaseFailure<META_DATA> {
  constructor(metaData?: META_DATA) {
    super(commonLangKey.failure.network, commonLangNs, metaData);
  }
}