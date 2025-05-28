import * as signalR from "@microsoft/signalr";

class Connector {
  private connection: signalR.HubConnection;
  private menuUpdateCallback: (() => void) | null = null;
  private static instance: Connector;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_baseApiUrl}/menuHub`)
      .withServerTimeout(120000)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.connection
      .start()
      .then(() => {
        console.log("Connection started");
      })
      .catch((error) =>
        console.log("Error occurred when establishing connection: ", error)
      );

    console.log(
      "Server timeout: ",
      this.connection.serverTimeoutInMilliseconds
    );

    this.connection.on("ReceiveMenuUpdate", () => {
      if (this.menuUpdateCallback) {
        this.menuUpdateCallback();
      }
    });

    // this.connection.on("ReceiveRestaurantUpdate", () => {
    //   this.onRestaurantUpdateReceived();

    // this.onMenuReceived = (method) => {

    // };
  }

  public static getInstance(): Connector {
    if (!Connector.instance) {
      Connector.instance = new Connector();
    }

    return Connector.instance;
  }

  public onMenuReceived(callback: () => void): void {
    this.menuUpdateCallback = callback;
  }
}

export default Connector;
