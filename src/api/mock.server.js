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
      this.timing = 3000;
      this.resource("products");
      this.resource("carts");
      this.resource("wishlists");
    },

    seeds(server) {
      database.forEach(
        ({
          id,
          name,
          image,
          price,
          category,
          brand,
          inStock,
          fastDelivery,
          ratings,
          offer,
          level,
          color,
          avalQty
        }) => {
          server.create("product", {
            id,
            name,
            image,
            price,
            category,
            brand,
            inStock,
            fastDelivery,
            ratings,
            offer,
            color,
            level,
            avalQty
          });
        }
      );

      [database[1]].forEach(
        ({
          id,
          name,
          image,
          price,
          category,
          brand,
          inStock,
          fastDelivery,
          ratings,
          offer,
          level,
          color,
          avalQty
        }) => {
          server.create("cart", {
            id,
            name,
            image,
            price,
            category,
            brand,
            inStock,
            fastDelivery,
            ratings,
            offer,
            color,
            level,
            avalQty,
            cartQty: 1
          });
        }
      );

      [database[1]].forEach(
        ({
          id,
          name,
          image,
          price,
          category,
          brand,
          inStock,
          fastDelivery,
          ratings,
          offer,
          level,
          color
        }) => {
          server.create("wishlist", {
            id,
            name,
            image,
            price,
            category,
            brand,
            inStock,
            fastDelivery,
            ratings,
            offer,
            color,
            level
          });
        }
      );
    }
  });
}
