import test from 'ava'
import { createTestClient } from 'apollo-server-testing'

import server from '..'

test('it works', async t => {
  const { query } = createTestClient(server)

  const response = await query({
    query: `{
      books {
        author {
          name
        }
        title
      }
    }`,
  })

  t.deepEqual(
    response.data,
    {
      books: [
        {
          author: {
            name: 'John Steinbeck',
          },
          title: 'Grapes Of Wrath',
        },
        {
          author: {
            name: 'John Steinbeck',
          },
          title: 'Of Mice and Men',
        },
        {
          author: {
            name: 'Charles Darwin',
          },
          title: 'Origin Of Species',
        },
      ],
    },
    'returns books'
  )

  t.falsy(response.errors, 'no errors')
})
