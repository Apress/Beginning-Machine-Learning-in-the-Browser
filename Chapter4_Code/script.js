const model =tf.sequential();

const confighidden={
	inputShape:[2],
	units:4,
	activation:'sigmoid'
}

const configoutput={
	units:1,
	activation:'sigmoid'
}

const hidden =tf.layers.dense(confighidden);
const output=tf.layers.dense(configoutput);

model.add(hidden);
model.add(output);

const sgdopt=tf.train.sgd(0.1);

const config={
	optimizer:sgdopt,
	loss:'meanSquaredError'
}

model.compile(config);

const xs=tf.tensor2d([[0,0],[0.5,0.5],[1,1]]);
const ys=tf.tensor2d([[1],[0.5],[0]]);

train().then(() => {
	let outputs=model.predict(xs);
	outputs.print();
	console.log('training complete');
});

async function train()
{
	for(let i=0;i<5000;i++) {
const response=await model.fit(xs,ys);
console.log(response.history.loss[0]);
} }
