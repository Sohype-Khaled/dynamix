import {v4 as uuidv4} from 'uuid'
import {faker} from '@faker-js/faker'
import audioFile from '@/assets/eona-emotional-ambient-pop.mp3';

export const messages = [
  {
    "id": "382",
    "uuid": "2c2c3103-01e7-4d67-9210-d9bb01d84838",
    "attachment_id": null,
    "record": null,
    "text": "I Neeed Help",
    "created_at": "2025-05-28T16:31:20.461Z",
    "updated_at": "2025-05-28T16:31:20.461Z",
    "user_id": "39",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 39, "username": "mohamed mohamed"},
    "seen_at": null,
    "isSent": true,
    "state": "delivered"
  }, {
    "id": "383",
    "uuid": "89e65daf-a851-46b6-bcb5-2e7df1d67544",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"hi how can i help you\"}]}]}",
    "created_at": "2025-05-28T16:31:41.306Z",
    "updated_at": "2025-05-28T16:31:41.306Z",
    "user_id": "120",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 120, "username": "ali bora3i"},
    "seen_at": null,
    "isSent": false,
    "state": "delivered"
  }, {
    "id": "384",
    "uuid": "92ae9b4d-3dc9-442b-af1b-cb4eb0bf6e60",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"you can help me with returning the item I\"},{\"type\":\"text\",\"marks\":[{\"type\":\"bold\"}],\"text\":\" BOUAGT\"}]}]}",
    "created_at": "2025-05-28T16:35:25.288Z",
    "updated_at": "2025-05-28T16:35:25.288Z",
    "user_id": "39",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 39, "username": "mohamed mohamed"},
    "seen_at": null,
    "isSent": true,
    "state": "delivered"
  }, {
    "id": "385",
    "uuid": "77e0079f-e066-41cc-ae3e-296813650d6a",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"dsad\"}]}]}",
    "created_at": "2025-05-28T18:31:25.086Z",
    "updated_at": "2025-05-28T18:31:25.086Z",
    "user_id": "120",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 120, "username": "ali bora3i"},
    "seen_at": null,
    "isSent": false,
    "state": "delivered"
  }, {
    "id": "386",
    "uuid": "d58bb174-007b-4fe5-a3ce-10b54d4383ed",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"dasd\"}]}]}",
    "created_at": "2025-05-28T18:31:27.658Z",
    "updated_at": "2025-05-28T18:31:27.658Z",
    "user_id": "39",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 39, "username": "mohamed mohamed"},
    "seen_at": null,
    "isSent": true,
    "state": "delivered"
  }, {
    "id": "387",
    "uuid": "a2df37c1-acd8-4df4-82b3-7bd634bd36e1",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"ds\"}]}]}",
    "created_at": "2025-05-28T18:31:37.701Z",
    "updated_at": "2025-05-28T18:31:37.701Z",
    "user_id": "120",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 120, "username": "ali bora3i"},
    "seen_at": null,
    "isSent": false,
    "state": "delivered"
  }, {
    "id": "388",
    "uuid": "a6074db8-5440-4417-951e-3e33892231b5",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"das\"}]}]}",
    "created_at": "2025-05-28T18:31:39.162Z",
    "updated_at": "2025-05-28T18:31:39.162Z",
    "user_id": "39",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 39, "username": "mohamed mohamed"},
    "seen_at": null,
    "isSent": true,
    "state": "delivered"
  }, {
    "id": "389",
    "uuid": "a254453e-d2df-49cd-aec5-3ec74f8c1721",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"das\"}]}]}",
    "created_at": "2025-05-28T18:31:40.588Z",
    "updated_at": "2025-05-28T18:31:40.588Z",
    "user_id": "120",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 120, "username": "ali bora3i"},
    "seen_at": null,
    "isSent": false,
    "state": "delivered"
  }, {
    "id": "390",
    "uuid": "07101e5a-07be-4e11-b0a3-62c8e7f2df24",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"dasd\"}]}]}",
    "created_at": "2025-05-28T18:31:42.070Z",
    "updated_at": "2025-05-28T18:31:42.070Z",
    "user_id": "39",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 39, "username": "mohamed mohamed"},
    "seen_at": null,
    "isSent": true,
    "state": "delivered"
  }, {
    "id": "391",
    "uuid": "737fb1e8-d06a-4f45-8eb3-bac81cf4be8d",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"das\"}]}]}",
    "created_at": "2025-05-28T18:31:43.481Z",
    "updated_at": "2025-05-28T18:31:43.481Z",
    "user_id": "120",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 120, "username": "ali bora3i"},
    "seen_at": null,
    "isSent": false,
    "state": "delivered"
  }, {
    "id": "392",
    "uuid": "8af7f155-0fda-4004-b226-99c8eb28906d",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"asd\"}]}]}",
    "created_at": "2025-05-28T18:31:47.201Z",
    "updated_at": "2025-05-28T18:31:47.201Z",
    "user_id": "120",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 120, "username": "ali bora3i"},
    "seen_at": null,
    "isSent": false,
    "state": "delivered"
  }, {
    "id": "393",
    "uuid": "a948f23b-9450-43db-8076-0f9c203ea4fa",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"dasd\"}]}]}",
    "created_at": "2025-05-28T18:31:50.394Z",
    "updated_at": "2025-05-28T18:31:50.394Z",
    "user_id": "120",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 120, "username": "ali bora3i"},
    "seen_at": null,
    "isSent": false,
    "state": "delivered"
  }, {
    "id": "394",
    "uuid": "ade63099-add2-44e5-a874-4242c9066536",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"dasd\"}]}]}",
    "created_at": "2025-05-28T18:34:30.996Z",
    "updated_at": "2025-05-28T18:34:30.996Z",
    "user_id": "120",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 120, "username": "ali bora3i"},
    "seen_at": null,
    "isSent": false,
    "state": "delivered"
  }, {
    "id": "395",
    "uuid": "d3348c76-4e2a-473b-937a-4b1e264040df",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"dasdas\"}]}]}",
    "created_at": "2025-05-28T18:34:33.520Z",
    "updated_at": "2025-05-28T18:34:33.520Z",
    "user_id": "39",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 39, "username": "mohamed mohamed"},
    "seen_at": null,
    "isSent": true,
    "state": "delivered"
  }, {
    "id": "396",
    "uuid": "9dfefca3-40c5-4ea7-a64c-00caf14da273",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"dd\"}]}]}",
    "created_at": "2025-05-28T18:37:55.926Z",
    "updated_at": "2025-05-28T18:37:55.926Z",
    "user_id": "120",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 120, "username": "ali bora3i"},
    "seen_at": null,
    "isSent": false,
    "state": "delivered"
  }, {
    "id": "397",
    "uuid": "75a9b561-f140-49aa-87ae-523a13a3b7be",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"dasd\"}]}]}",
    "created_at": "2025-05-28T18:38:24.702Z",
    "updated_at": "2025-05-28T18:38:24.702Z",
    "user_id": "120",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 120, "username": "ali bora3i"},
    "seen_at": null,
    "isSent": false,
    "state": "delivered"
  }, {
    "id": "398",
    "uuid": "6093e906-6551-4fee-8e72-5a9068c10e3b",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"sd\"}]}]}",
    "created_at": "2025-05-28T18:38:26.432Z",
    "updated_at": "2025-05-28T18:38:26.432Z",
    "user_id": "120",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 120, "username": "ali bora3i"},
    "seen_at": null,
    "isSent": false,
    "state": "delivered"
  }, {
    "id": "399",
    "uuid": "b543d307-1eaf-487a-85b8-dee59270e104",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"dasd\"}]}]}",
    "created_at": "2025-05-28T18:40:35.859Z",
    "updated_at": "2025-05-28T18:40:35.859Z",
    "user_id": "120",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 120, "username": "ali bora3i"},
    "seen_at": null,
    "isSent": false,
    "state": "delivered"
  }, {
    "id": "400",
    "uuid": "487969e7-e21d-4d3d-bb89-b9bd68cfb473",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"sdasd\"}]}]}",
    "created_at": "2025-05-28T18:40:38.941Z",
    "updated_at": "2025-05-28T18:40:38.941Z",
    "user_id": "39",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 39, "username": "mohamed mohamed"},
    "seen_at": null,
    "isSent": true,
    "state": "delivered"
  }, {
    "id": "401",
    "uuid": "23c2ba03-bd08-49af-a940-6e4945f916f6",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"sasd\"}]}]}",
    "created_at": "2025-05-28T18:40:40.086Z",
    "updated_at": "2025-05-28T18:40:40.086Z",
    "user_id": "39",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 39, "username": "mohamed mohamed"},
    "seen_at": null,
    "isSent": true,
    "state": "delivered"
  },
  {
    "id": "41b1322c-3bb7-49aa-a574-0fe00cc6b874",
    "uuid": "05e321d6-e265-47d2-9e3e-e7ca16813355",
    "attachment_id": null,
    "record": null,
    "text": "{\"type\":\"doc\",\"content\":[{\"type\":\"paragraph\",\"content\":[{\"type\":\"text\",\"text\":\"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis doloribus exercitationem fugiat neque nihil nobis obcaecati placeat repellendus sequi similique? Ad at dolorum eaque fugiat ipsam, iure laudantium quam quia velit veniam voluptate voluptatibus. Aliquam, enim expedita illum inventore porro quae vero voluptates! Accusamus distinctio dolor fuga magni odit officiis! Aut consectetur cum dicta dolor earum eius eos ex exercitationem facere impedit, in ipsa ipsam itaque iure labore laborum libero, maiores, nam nesciunt nisi obcaecati perferendis porro praesentium quaerat quasi qui quibusdam repellendus reprehenderit sit sunt tempora tempore tenetur unde! Dolorem maxime sunt totam. Aliquam autem commodi consequuntur delectus deleniti, dignissimos distinctio earum eligendi eveniet excepturi exercitationem facere impedit incidunt ipsam iure magni minima natus nulla, odio praesentium quasi quibusdam quisquam quos rerum saepe soluta suscipit temporibus ut vitae voluptatum! Architecto atque blanditiis commodi deleniti dignissimos dolorem, ea eius fugiat id in iure libero molestiae nemo quaerat quasi quis quisquam quod, recusandae sed veniam. Commodi fuga ipsum minima optio ratione, sequi? Blanditiis delectus dolores excepturi expedita fugiat in minus possimus quidem quod quos rem, sit? Consequuntur dolor ducimus eveniet expedita explicabo, itaque laborum numquam, perferendis porro, quae quibusdam quisquam veniam! Accusamus atque delectus dolore eligendi est et facilis fugit id, impedit incidunt laborum maiores neque repellendus tempore vel voluptate voluptatum? Facilis odio officia placeat possimus quasi quisquam soluta. Beatae deleniti explicabo laborum mollitia pariatur perferendis similique. A accusamus deserunt doloremque est eveniet, ipsa iure, mollitia necessitatibus nisi officiis omnis pariatur provident quaerat rerum totam vero, voluptatem voluptatibus. Ab ad alias aspernatur aut commodi consectetur culpa dicta doloribus eveniet excepturi facere ipsa iusto maxime minima natus neque nobis non nostrum pariatur possimus quaerat quam quibusdam quo quod repellendus, tempora temporibus ullam, unde ut veritatis. Alias aliquam architecto consequuntur cupiditate debitis distinctio dolor dolorem illo impedit in ipsam itaque iure laudantium neque nesciunt nobis nostrum, nulla quae quaerat quam quibusdam, suscipit unde. Ad, alias aliquid aut cum cumque delectus ea et eveniet expedita ipsum magnam molestias, natus neque nisi non nostrum officia praesentium, reiciendis repudiandae sequi similique vel veniam vero voluptatem voluptatibus? Ad adipisci aperiam architecto autem consequatur delectus deserunt dicta dolores earum eius error est fugiat ipsam laborum, magnam mollitia necessitatibus nemo nesciunt non omnis provident quam quas, quod rem similique ut vero voluptas. Blanditiis eos fugiat minima reiciendis voluptatem! Ab accusamus adipisci aperiam aspernatur consectetur consequuntur distinctio eaque eius, eveniet id magni minus neque non nulla officia quidem rerum sapiente vel? Accusamus eveniet ipsum iure libero maxime optio perferendis quis similique! Autem ea facere fugit id voluptas. Animi architecto assumenda atque, beatae, cumque cupiditate debitis deleniti deserunt dolor dolorem eos excepturi expedita illum incidunt itaque maiores minima neque, nihil possimus quaerat quam quis quod saepe sed sit tenetur ut voluptatum? Ad animi atque delectus deleniti dignissimos ea, eligendi error esse exercitationem facilis incidunt inventore nemo nihil quasi, rerum sit veritatis! Accusamus magnam nesciunt numquam perspiciatis sunt! Accusantium, adipisci animi corporis cumque debitis deleniti dignissimos, doloribus et illo laboriosam laudantium nisi possimus quae quod rerum, soluta sunt unde vitae. Accusantium, libero!\"}]}]}",
    "created_at": "2025-05-28T20:32:22.903Z",
    "updated_at": "2025-05-28T20:32:22.903Z",
    "user_id": "39",
    "anonymous_user_id": null,
    "room_id": "123",
    "sender": {"id": 39, "username": "mohamed mohamed"},
    "seen_at": null,
    "isSent": true,
    "state": "delivered"
  }
];

function generateTimestamp() {
  return faker.date.recent({days: 7}).toISOString()
}


/**
 * Generate a TipTap JSON document mock
 * with `n` paragraphs and random text
 */
export function generateTipTapJsonMock(paragraphCount = 1) {
  return {
    type: 'doc',
    content: Array.from({length: paragraphCount}, () => ({
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: faker.lorem.sentences(faker.number.int({min: 1, max: 3}))
        }
      ]
    }))
  }
}

function createUser(id?: number, isStaff = false) {
  const generatedId = id ?? faker.number.int({min: 1, max: 9999})
  return {
    id: generatedId,
    userType: 'Registered',
    username: faker.person.fullName(),
    email: faker.internet.email(),
    image: 'https://admin.nawahscientific.com/static/users/avatar.svg',
    accountType: isStaff ? 'account_manager' : 'customer',
    isStaff
  }
}


function createRoom(): any {
  const peerCount = faker.number.int({min: 1, max: 3})
  const users = Array.from({length: peerCount + 1}, () => createUser())
  const peers = users.slice(1)
  const peerNames = peers.map(p => p.username)
  const peerImages = peers.map(() => ({
    src: 'https://admin.nawahscientific.com/static/logos/FullColor/ICON-4*4.svg',
    alt: 'Nawah'
  }))

  return {
    id: uuidv4(),
    uuid: uuidv4(),
    sentAt: generateTimestamp(),
    isClosed: faker.datatype.boolean(),
    title: faker.lorem.words({min: 2, max: 6}),
    text: JSON.stringify(generateTipTapJsonMock(1)),
    hasAttachment: faker.datatype.boolean(),
    hasAudio: faker.datatype.boolean(),
    unseenCount: faker.number.int({min: 0, max: 25}),
    users,
    peers,
    peerNames,
    peerImages,
    indicator: peers.length > 0 && faker.datatype.boolean(),
    indicatorColor: 'green-500',
  }
}

export function generateMockRooms(count: number = 5): any[] {
  return Array.from({length: count}, () => createRoom())
}

export function generateMockMessages(count: number = 20, roomId: string = '123') {
  const customer = createUser(39, false)
  const staff = createUser(120, true)
  const senders = [customer, staff]

  return Array.from({length: count}).map((_, i) => {
    const sender = senders[i % 2]
    const createdAt = faker.date.recent({days: 3}).toISOString()
    const isAudio = Math.random() < 0.75 // 75% chance for audio

    return {
      id: faker.number.int({min: 300, max: 999}).toString(),
      uuid: uuidv4(),
      attachment: null,
      record: isAudio ? uuidv4() : null,
      text: isAudio ? null : JSON.stringify(generateTipTapJsonMock()),
      created_at: createdAt,
      updated_at: createdAt,
      user_id: sender.id.toString(),
      anonymous_user_id: null,
      room_id: roomId,
      replyTo: '',
      sender: {
        id: sender.id,
        username: sender.username
      },
      seen_at: null,
      isSent: sender.accountType !== 'account_manager',
      state: 'delivered'
    }
  })
}


export async function fakeHandleAudioUpload(blob: Blob): Promise<string> {
  // Simulate upload delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Generate fake ID using timestamp or UUID logic
  return `audio_${Date.now()}`;
}

export async function fakeGetRecordById(id: string): Promise<Blob> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulated latency
  const res = await fetch(audioFile); // Get from static asset
  return await res.blob();
}