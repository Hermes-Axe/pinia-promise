class MyPromise {
  constructor(callback) {
    this.status = "pending";
    this.value = "";
    this.reason = "";
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    
    const resolve = (value) => {
      if (this.status == "pending") {
        this.status = "resolved";
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    const reject = (reason) => {
      if (this.status == "pending") {
        this.status = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      callback(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onResolved, onRejected) {
    onResolved =
      typeof onResolved === "function" ? onResolved : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status == "resolved") {
        try {
          const x = onResolved(this.value);
          resolve(x);
        } catch (error) {
          reject(error);
        }
      }
      if (this.status == "rejected") {
        try {
          const x = onRejected(this.reason);
          resolve(x);
        } catch (error) {
          reject(error);
        }
      }
      if (this.status == "pending") {
        this.onResolvedCallbacks.push(() => {
          if (this.status == "resolved") {
            try {
              const x = onResolved(this.value);
              resolve(x);
            } catch (error) {
              reject(error);
            }
          }
        });
        this.onRejectedCallbacks.push(() => {
          if (this.status == "rejected") {
            try {
              const x = onRejected(this.reason);
              resolve(x);
            } catch (error) {
              reject(error);
            }
          }
        });
      } else {
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
      }
    });
    return promise2;
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

export default MyPromise;