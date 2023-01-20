type MyTransformerFn<T, R> = (source: T) => R;

let id = 0;

class MyTransformer<T> {
  readonly id = id++;
  readonly initialValue: T;
  readonly source: MyTransformer<T> | null;

  get operators(): readonly MyTransformerFn<any, any>[] {
    return Object.freeze(this._operators);
  }

  private _operators: MyTransformerFn<any, any>[];

  constructor(initialValue: T, source?: MyTransformer<T> | null) {
    this.initialValue = initialValue;
    this.source = source ?? null;
    this._operators = source ? [...source.operators] : [];
  }

  pipe(): MyTransformer<T>;
  pipe<A>(op1: MyTransformerFn<T, A>): MyTransformer<A>;
  pipe<A, B>(
    op1: MyTransformerFn<T, A>,
    op2: MyTransformerFn<A, B>
  ): MyTransformer<B>;
  pipe<A, B, C>(
    op1: MyTransformerFn<T, A>,
    op2: MyTransformerFn<A, B>,
    op3: MyTransformerFn<B, C>
  ): MyTransformer<C>;
  pipe<A, B, C, D>(
    op1: MyTransformerFn<T, A>,
    op2: MyTransformerFn<A, B>,
    op3: MyTransformerFn<B, C>,
    op4: MyTransformerFn<C, D>
  ): MyTransformer<D>;
  pipe<A, B, C, D, E>(
    op1: MyTransformerFn<T, A>,
    op2: MyTransformerFn<A, B>,
    op3: MyTransformerFn<B, C>,
    op4: MyTransformerFn<C, D>,
    op5: MyTransformerFn<D, E>
  ): MyTransformer<E>;
  pipe<A, B, C, D, E, F>(
    op1: MyTransformerFn<T, A>,
    op2: MyTransformerFn<A, B>,
    op3: MyTransformerFn<B, C>,
    op4: MyTransformerFn<C, D>,
    op5: MyTransformerFn<D, E>,
    op6: MyTransformerFn<E, F>
  ): MyTransformer<F>;
  pipe<A, B, C, D, E, F, G>(
    op1: MyTransformerFn<T, A>,
    op2: MyTransformerFn<A, B>,
    op3: MyTransformerFn<B, C>,
    op4: MyTransformerFn<C, D>,
    op5: MyTransformerFn<D, E>,
    op6: MyTransformerFn<E, F>,
    op7: MyTransformerFn<F, G>
  ): MyTransformer<G>;
  pipe<A, B, C, D, E, F, G, H>(
    op1: MyTransformerFn<T, A>,
    op2: MyTransformerFn<A, B>,
    op3: MyTransformerFn<B, C>,
    op4: MyTransformerFn<C, D>,
    op5: MyTransformerFn<D, E>,
    op6: MyTransformerFn<E, F>,
    op7: MyTransformerFn<F, G>,
    op8: MyTransformerFn<G, H>
  ): MyTransformer<H>;
  pipe<A, B, C, D, E, F, G, H, I>(
    op1: MyTransformerFn<T, A>,
    op2: MyTransformerFn<A, B>,
    op3: MyTransformerFn<B, C>,
    op4: MyTransformerFn<C, D>,
    op5: MyTransformerFn<D, E>,
    op6: MyTransformerFn<E, F>,
    op7: MyTransformerFn<F, G>,
    op8: MyTransformerFn<G, H>,
    op9: MyTransformerFn<H, I>
  ): MyTransformer<I>;
  pipe<A, B, C, D, E, F, G, H, I>(
    op1: MyTransformerFn<T, A>,
    op2: MyTransformerFn<A, B>,
    op3: MyTransformerFn<B, C>,
    op4: MyTransformerFn<C, D>,
    op5: MyTransformerFn<D, E>,
    op6: MyTransformerFn<E, F>,
    op7: MyTransformerFn<F, G>,
    op8: MyTransformerFn<G, H>,
    op9: MyTransformerFn<H, I>,
    ...operations: MyTransformerFn<any, any>[]
  ): MyTransformer<unknown>;
  pipe(...ops: MyTransformerFn<any, any>[]): MyTransformer<any> {
    this._operators.push(...ops);
    return new MyTransformer(this.initialValue, this);
  }

  getValue(): T {
    return this.operators.reduce((acc, op) => op(acc), this.initialValue);
  }
}

function add2<T extends number>(): MyTransformerFn<T, number> {
  return (src) => src + 2;
}

function multiply5<T extends number>(): MyTransformerFn<T, number> {
  return (src) => src * 5;
}

function subtract3<T extends number>(): MyTransformerFn<T, number> {
  return (src) => src - 3;
}

function toString<T>(): MyTransformerFn<T, string> {
  return (src) => `${src}`;
}

function log<T>(): MyTransformerFn<T, T> {
  return (src) => {
    console.log('log', src);
    return src;
  };
}

// Implementation

const myTransformer = new MyTransformer(5).pipe(add2(), toString());

console.log(myTransformer);
console.log(myTransformer.getValue());
