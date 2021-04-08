import { createServer, Model, RestSerializer } from "miragejs";
import { database } from "../database";

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },
    models: {
      product: Model,
      cart: Model,
      wishlist: Model
    },

    routes() {
      this.namespace = "api";
      this.timing = 2000;
      this.resource("products");
      this.resource("carts");
      this.resource("wishlists");
    },

    seeds(server) {
      database.forEach((product) => {
        server.create("product", {
          ...product
        });
      });

      [database[1]].forEach((product) => {
        server.create("cart", {
          ...product,
          cartQty: 1,
          status: { exists: true }
        });
      });

      [database[1]].forEach((product) => {
        server.create("wishlist", {
          ...product,
          status: { exists: true }
        });
      });
    }
  });
}
