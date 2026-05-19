function logout(req) {
    return new Promise((resolve, reject) => {
        if (!req.session) {
            resolve({
                status: "success",
                message: "Ingen aktiv session a logge ut."
            });
            return;
        }

        req.session.destroy((err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                status: "success",
                message: "Du er logget ut."
            });
        });
    });
}

module.exports = { logout };