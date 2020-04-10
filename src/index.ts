import express from 'express';
import * as line from '@line/bot-sdk';
import { WebhookEvent } from '@line/bot-sdk';
import { newMemberNotice } from './messages';
import './env';

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
  channelSecret: process.env.LIEN_CHANNEL_SECRET!
};

const PORT = process.env.PORT || 3000;

const client = new line.Client(config);
function handleEvent(event: WebhookEvent) {
  if (event.type === 'memberJoined' && event.source.type === 'group') {
    return Promise.all(
      event.joined.members.map(async ({ userId }) => {
        if (event.source.type === 'group') {
          const user = await client.getGroupMemberProfile(
            event.source.groupId,
            userId
          );
          await client.replyMessage(
            event.replyToken,
            newMemberNotice(user.displayName)
          );
        }
      })
    );
  }

  return Promise.resolve(null);
}

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(() => {
      res.status(200).json({});
    })
    .catch(error => {
      console.error(error);
    });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
