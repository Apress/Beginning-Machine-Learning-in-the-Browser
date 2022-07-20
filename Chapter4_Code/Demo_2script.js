const model =tf.sequential();

const confighidden={
	inputShape:[2],
	units:5,
	activation:'sigmoid'
}

const configoutput={
	units:2,
	activation:'softmax'
}

const hidden =tf.layers.dense(confighidden);
const output=tf.layers.dense(configoutput);

model.add(hidden);
model.add(output);

const admopt=tf.train.adam(0.1);

const config={
	optimizer:admopt,
	loss:'categoricalCrossentropy'
}

model.compile(config);

const xs=tf.tensor2d([[0,0],[0,1],[1,0],[1,1]],[4,2]);
const ys=tf.oneHot(tf.tensor1d([1,1,1,0]).toInt(),2);

train().then(() => {
	let outputs=model.predict(xs);
	outputs.print();
	console.log('training complete');
});

async function train()
{
	for(let i=0;i<200;i++) {
const response=await model.fit(xs,ys);
console.log(response.history.loss[0]);
} }
