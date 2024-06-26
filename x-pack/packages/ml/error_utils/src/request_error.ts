/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { MLErrorObject, ErrorType } from './types';

/**
 * ML Request Failure
 *
 * @export
 * @class MLRequestFailure
 * @typedef {MLRequestFailure}
 * @extends {Error}
 */
export class MLRequestFailure extends Error {
  /**
   * Creates an instance of MLRequestFailure.
   *
   * @constructor
   * @param {MLErrorObject} error
   * @param {ErrorType} resp
   */
  constructor(error: MLErrorObject, resp: ErrorType) {
    super(error.message);
    Object.setPrototypeOf(this, new.target.prototype);

    if (typeof resp !== 'string' && typeof resp !== 'undefined') {
      if ('body' in resp) {
        this.stack = JSON.stringify(resp.body, null, 2);
      } else {
        try {
          this.stack = JSON.stringify(resp, null, 2);
        } catch (e) {
          // fail silently
        }
      }
    }
  }
}
