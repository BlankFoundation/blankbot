import {jest} from '@jest/globals'
import whoami from '../../commands/whoami.js' 

test("whoami", async () => {
    const interaction = {
        reply: jest.fn()
    }
    await whoami(interaction);

    const reply = interaction.reply.mock
    expect(reply.calls).toHaveLength(1)
    expect(reply.calls[0][0].content).toContain('Blank bot')
    expect(reply.calls[0][0].ephemeral).toBeTruthy()
});