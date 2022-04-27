## A Fauna authentication skeleton from the frontend.

This repository is a basic Fauna skeleton that implements authentication from the front-end with React. This implementation is keeping access tokens with a lifetime of one hour in browser memory. It is combines functionality from the following [blueprints](https://github.com/fauna-labs/fauna-blueprints): 

- [register-login-logout](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/register-login-logout): basic register, login and logout functionality
- [validation](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/validation): email and password validation
- [rate-limiting](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/rate-limiting): rate-limiting and limiting of the amount of calls a user can do for a specific action plus reset functionality to remove previous logs for that action.
- [password-reset](https://github.com/fauna-labs/fauna-blueprints/tree/main/official/auth/password-reset): the change password function is used to change the password by providing the old password.

### Setup

To use the skeleton, clone it:

```
git@github.com:fauna-labs/faunadb-auth-skeleton-frontend.git
```

Run npm install:

```
npm install
```

Create a database and a Fauna admin key `<my fauna key>` via the shell or Fauna [dashboard](https://dashboard.fauna.com/). Create a file `.env.local` in the project root with contents `FAUNA_ADMIN_KEY=<my fauna admin secret>`.  Note: ensure that this file is in `.gitignore`. It should not be committed to your repository!

Provision the Fauna resources with the [Fauna Schema Migrate](https://github.com/fauna-labs/fauna-schema-migrate) tool. 

Generate a migration from the resources in `fauna/resources`
```
npx fauna-schema-migrate generate
```

Apply the migration, adding collections, indexes, functions and roles to your live database.  Note: In case `fauna-schema-migrate` isn't able to access the `FAUNA_ADMIN_KEY` directly from `.env.local`, prefix the `fauna-schema-migrate apply` call with the key/value like this:
```
FAUNA_ADMIN_KEY=<my fauna admin secret> npx fauna-schema-migrate apply all
```

In the Fauna dashboard, select the database you created.  You should see the generated collections, indexes, functions and roles.  In particular, you should see a role called `public`.  This role has limited permissions.  On the Security tab, click `NEW KEY`, select the `public` role and click Save.  Add the generated secret to your `.env.local` like this:

```
REACT_APP_LOCAL___BOOTSTRAP_KEY=<my public role secret>
```

Run the frontend: 

```
npm run start
```

### Populate some example data

Run the following query in the Fauna dashboard shell of your database. 

```
Do(
  Create(Collection('dinos'), {
    data: {
      name: 'Skinny Dino',
      icon: 'skinny_dino.png',
      rarity: 'exotic'
    }
  }),
  Create(Collection('dinos'), {
    data: {
      name: 'Metal Dino',
      icon: 'metal_dino.png',
      rarity: 'common'
    }
  }),
  Create(Collection('dinos'), {
    data: {
      name: 'Flower Dino',
      icon: 'flower_dino.png',
      rarity: 'rare'
    }
  }),
  Create(Collection('dinos'), {
    data: {
      name: 'Grumpy Dino',
      icon: 'grumpy_dino.png',
      rarity: 'legendary'
    }
  }),
  Create(Collection('dinos'), {
    data: {
      name: 'Old Gentleman Dino',
      icon: 'old_gentleman_dino.png',
      rarity: 'legendary'
    }
  }),
  Create(Collection('dinos'), {
    data: {
      name: 'Old Lady Dino',
      icon: 'old_lady_dino.png',
      rarity: 'epic'
    }
  }),
  Create(Collection('dinos'), {
    data: {
      name: 'Sitting Dino',
      icon: 'sitting_dino.png',
      rarity: 'common'
    }
  }),
  Create(Collection('dinos'), {
    data: {
      name: 'Sleeping Dino',
      icon: 'sleeping_dino.png',
      rarity: 'uncommon'
    }
  })
)
```

### Features

- Login
- Register
- Logout
- Change password when logged in
- Block calls on 3 faulty logins. 
- Authorization rules for public data, data for regular logged in users and admin users. Give a user admin privileges by changing his document and providing him with a `type: "admin"` field. 
- Identity-based rate-limiting for logged-in users and separate rate-limiting for anonymous users. 
- Validation on the email and password field when registering. 

