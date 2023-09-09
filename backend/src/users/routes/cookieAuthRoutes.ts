import express, { Response, Request } from 'express';

export interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined };
}

const router = express.Router();

router.get('/', (req: Request, res: Response): void => {
    if (req.session && req.session.loggedIn) {
        res.send(`
            <div>
              <div>
                <label>You are logged in</label>
              </div>
              <a href="/logout">Logout</button>
            </div>
        `);
        return;
    }
    res.send(`
    <div>
      <div>
        <label>You are not logged in</label>
      </div>
      <a href="/login">Log in</button>
    </div>
  `);
});

router.get('/login', (req: Request, res: Response): void => {
    res.send(`
  <form method="POST">
    <div>
      <label>Email</label>
      <input name="email" type="email"/>
    </div>
    <div>
      <label>Password</label>
      <input name="password" type="password"/>
    </div>
    <button>Submit</button>
  </form>
`);
});
router.get('/logout', (req: Request, res: Response) => {
    req.session = undefined;
    res.redirect('/');
});
router.post('/login', (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body;
    if (
        email &&
        password &&
        email === 'hi@hi.com' &&
        password === 'passwordexpress'
    ) {
        req.session = { loggedIn: true };
        res.redirect('/');
    } else {
        res.send('Invalid email or password');
    }
});

export default router;
