import { jest } from "@jest/globals";
import ping from "../../commands/ping.js";

test("ping", async () => {
  const interaction = {
    reply: jest.fn(),
  };
  await ping(interaction);

  const reply = interaction.reply.mock;
  expect(reply.calls).toHaveLength(1);
  expect(reply.calls[0][0].content).toBe("Pong!");
});
