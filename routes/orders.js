const Router = require('koa-router');
const uuid = require('uuid').v4;

const ordersRouter = new Router({ prefix: '/orders' });
const ordersData = require('../lib/orders');

ordersRouter.post('/', async ctx => {
    const { customerName, items } = ctx.request.body;

    if (!items.length) {
        ctx.throw(409, 'No items ordered')
    }
    
    const total = items.reduce((orderTotal, item) => orderTotal += (item.price * item.quantity), 0)
    const order = {
        id: uuid(),
        customerName,
        createdOn: new Date(),
        items,
        total
    }

    ctx.status = 201;
    ctx.body = [ ...ordersData, order ];
});

ordersRouter.get('/', async ctx => {
    const { filterProperty, filterValue } = ctx.query;

    let results = ordersData;

    if (filterProperty && filterValue) {
        const filteredResults = ordersData.filter(({ items }) => 
            items.filter(item => item[filterProperty] && item[filterProperty].includes(filterValue)).length > 0
        )
        results = filteredResults;
    }

    ctx.status = 200;
    ctx.body = results;
});

ordersRouter.get('/:id', async ctx => {
    const { id } = ctx.params;
    const order = ordersData.find(order => order.id === id)

    if (!order) {
        ctx.throw(404, 'Order not found')
    }

    ctx.status = 200;
    ctx.body = order;
});

ordersRouter.put('/:id', async ctx => {
    const { id } = ctx.params;
    const { customerName, items } = ctx.request.body;

    const order = ordersData.find(order => order.id === id);

    if(!order) {
        ctx.throw(404, 'Could not find order');
    }

    const price = items ? items.reduce((orderTotal, item) => orderTotal += (item.price * item.quantity), 0) : order.total;

    const updated = {
        ...order,
        customerName: customerName ? customerName : order.customerName,
        items: items ? items : order.items,
        price
    }

    ctx.status = 200;
    ctx.body = updated;
});

ordersRouter.delete('/:id', async ctx => {
    const { id } = ctx.params;

    const order = ordersData.find(order => order.id === id);

    if(!order) {
        ctx.throw(404, 'Could not find order');
    }

    const remaining = ordersData.filter(({ id }) => id !== latest.id);

    ctx.status = 200;
    ctx.body = remaining;
});

module.exports = ordersRouter;
