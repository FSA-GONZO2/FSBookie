const { db, User, Order, Bet, Post, Comment } = require('./server/db');
const { users, orders, bets, posts, comments } = require('./server/seedData');

const seed = async () => {
	try {
        await db.sync({ force: true });
		await Promise.all(
			users.map((user) => {
				User.create(user);
			}));
    } catch (e) {
        console.log(e);
    }
}

seed()
	.catch((err) => {
		console.error('Problem seeding:', err);
		db.close();
	});
