module.exports = {
    jwt: {
        tokenSecret: "BAKERY-TUNG154-!%$LS9",
        tokenLife: "7d",
        algorithm: "HS256",
    },
    permission: {
        admin: "ADMIN",
        user: "USER",
        deliverer: "DELIVERER",
    },
    export_receipt_status: {
        pending: 1,
        confirmed: 2,
        in_progress: 3,
        waiting_for_delivery: 4,
        delivering: 5,
        finished: 6,
        refused: 7,
    },
};
