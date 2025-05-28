import {
  ClientApiException,
  ProblemDetails,
} from "../client/MenuMaster.Client.Generated";

export interface IClientHelper {
  getStatusCode: (reason: unknown) => number;
  getTechnicalErrorMessage: (reason: unknown) => string | null;
  containsStatusCode: (reason: unknown) => reason is { status: number };
}

export class ClientHelper implements IClientHelper {
  getStatusCode = (reason: unknown): number => {
    if (this.containsStatusCode(reason)) {
      return reason.status;
    }

    return 0;
  };
  getTechnicalErrorMessage = (reason: unknown): string | null => {
    let errorMessage: string | null = null;

    if (ClientApiException.isClientApiException(reason)) {
      return reason.message;
    } else if (this.containsStatusCode(reason)) {
      switch (reason.status) {
        case 400: {
          const result = ClientHelper.getErrorModel<ProblemDetails>(reason);

          errorMessage = result?.detail ?? null;

          break;
        }

        case 500:
          errorMessage =
            ClientHelper.getErrorModel<ProblemDetails>(reason)?.detail ?? null;

          break;
        default:
          break;
      }
    }

    return errorMessage;
  };
  containsStatusCode = (reason: unknown): reason is { status: number } => {
    return typeof reason === "object" && reason !== null && "status" in reason;
  };

  static getErrorModel = <T>(reason: unknown): T | null => {
    return (reason as T) ?? null;
  };

  static getErrorMessage = (reason: unknown): string => {
    return (
      new ClientHelper().getTechnicalErrorMessage(reason) ??
      "Door een storing kunnen er geen resultaten worden getoond."
    );
  };
}
