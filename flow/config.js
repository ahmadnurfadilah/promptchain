import { config } from "@onflow/fcl";

config({
  "app.detail.title": "Promptchain",
  "app.detail.icon": `${process.env.NEXT_PUBLIC_BASE_URL}/img/logo.png`,
  "accessNode.api": `https://rest-${process.env.NEXT_PUBLIC_FLOW_NETWORK}.onflow.org`,
  "discovery.wallet": `https://fcl-discovery.onflow.org/${process.env.NEXT_PUBLIC_FLOW_NETWORK}/authn`,
});