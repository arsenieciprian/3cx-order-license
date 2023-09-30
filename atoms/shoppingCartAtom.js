const { atom, selector } = require('recoil');
const { recoilPersist } = require('recoil-persist');

const { persistAtom } = recoilPersist()
const cart = atom({
    key: 'cartState',
    default: [],
    effects_UNSTABLE: [persistAtom]
});

const cartDetail = atom({
    key: 'cartDetailState',
    default: [],
    effects_UNSTABLE: [persistAtom]
});

const partners = atom({
    key: 'partners',
    default: []
});

const cartDetailSubTotal = selector({
    key: 'cartDetailSubTotal',
    get: ({ get }) => {
        const cartDetailState = get(cartDetail);

        const subTotal = cartDetailState.reduce((total, item) => {
            const itemSubTotal = item.Items.reduce((itemTotal, product) => {
                const unitPrice = product.UnitPrice;
                const quantity = product.Quantity;
                const itemSubTotal = unitPrice * quantity;
                return itemTotal + itemSubTotal;
            }, 0);
            return total + itemSubTotal;
        }, 0);
        return subTotal
    }
})
const cartDetailGrandTotal = selector({
    key: 'cartDetailGrandTotal',
    get: ({ get }) => {
        const cartDetailState = get(cartDetail);
        var GrandTotal = cartDetailState.map(function (item) {
            return item?.GrandTotal ?? 0;
        });
        return GrandTotal
    }
})
const cartDetailLicenseTotal = selector({
    key: 'cartDetailLicenseTotal',
    get: ({ get }) => {
        const cartDetailState = get(cartDetail);
        var LicenseTotal = cartDetailState.map(function (item) {
            return item?.GrandTotal ?? 0;
        });

        const licenseTotal = cartDetailState.reduce((total, item) => total + (item.Items[0].UnitPrice * item.Items[0].Quantity), 0)
        return licenseTotal
    }
})

const cartDetailDiscountTotal = selector({
    key: 'cartDetailDiscountTotal',
    get: ({ get }) => {
        const cartDetailState = get(cartDetail);

        const discountTotal = cartDetailState.reduce((total, item) => {
            const itemDiscountTotal = item.Items.reduce((itemTotal, product) => {
                const unitPrice = product.UnitPrice;
                const discountPercentage = product.Discount;
                const quantity = product.Quantity;
                const itemDiscount = (unitPrice * quantity * discountPercentage) / 100;
                return itemTotal + itemDiscount;
            }, 0);
            return total + itemDiscountTotal;
        }, 0);

        return discountTotal
    }
})

const cartDetailHostingTotal = selector({
    key: 'cartDetailHostingTotal',
    get: ({ get }) => {
        const cartDetailState = get(cartDetail);
        var hostingTotal = cartDetailState.map(function (item) {
            return item.Items[1]?.UnitPrice ?? 0;
        });
        return hostingTotal
    }
})

const cartLength = selector({
    key: 'cartLength',
    get: ({ get }) => {
        const cartState = get(cart);
        return cartState.length;
    }
})

export { cart, cartLength, cartDetail, cartDetailSubTotal, cartDetailDiscountTotal, partners, cartDetailHostingTotal, cartDetailGrandTotal, cartDetailLicenseTotal }