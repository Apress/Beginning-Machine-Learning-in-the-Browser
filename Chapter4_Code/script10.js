let input, button
let IRIS_NUM_CLASSES =3
let nn_model;
let train_x;
let train_y;
let epoch_val;

function createModel()
{
  const model = tf.sequential();
  model.add(tf.layers.dense({inputShape: [4], units: 50, useBias: true, activation:'relu'}));
  model.add(tf.layers.dense({units: 20, activation: 'relu'}));
  //model.add(tf.layers.dense({units: 10, activation: 'relu'}));
  model.add(tf.layers.dense({units: 3, activation: 'softmax'}));
  return model;
}

async function trainModel(model)
{
    model.compile({
      optimizer: tf.train.adam(),
      loss: tf.losses.softmaxCrossEntropy,
      metrics: ['accuracy'],
    });
   const batchSize = 32;
    const epochs = epoch_val;
    const validationSplit =0.3;

    return await model.fit(train_x, train_y, {
      batchSize,
      epochs,
      validationSplit,
      shuffle: true,
      callbacks: tfvis.show.fitCallbacks(
        { name: 'Training Performance' },
        ['loss', 'val_loss','acc','val_acc'],
        { height: 200, callbacks: ['onEpochEnd'] })
    });
}

function iris_nn_model()
{
	epoch_val = int(input.value())
	
	if(epoch_val>0)
	{
		nn_model = createModel()
		tfvis.show.modelSummary({name: 'Model Summary'}, nn_model);
	
		if(train_x.shape[0] >0 && train_y.shape[0] >0 )
			trainModel(nn_model)
	}
}

function setup() 
{
  createCanvas(710, 400);

  // Loading Data
  loadJSON('iris.json',loadData)

  // Form Elements
  fill(0);
  textSize(30)
  text('Train Model',10,50)
  textSize(18)
  text('Train Epochs:',10,90) 
  input = createInput();
  input.position(140, 80);

  button = createButton('Train Model From Scratch');
  button.position(20,110, 200);
  let col = color(255,127,80)
  button.style('background-color', col);
  button.size(200,40)
  button.mousePressed(iris_nn_model);

}




function loadData(data)
{
  const values = data.map(item => ({ 
    a: item.sepalLength,
    b: item.sepalWidth,
    c: item.petalLength,
    d: item.petalWidth,
    label: item.species
  }));

  const dataset = values.filter(item => (
    
    item.a != null && item.b != null && item.c != null && item.d != null && item.label != null 
  ));
  
  const {inputs, labels} = convertToTensor(dataset);
  train_x = inputs
  train_y = labels
  
  console.log(train_x.shape[0])
}


function convertToTensor(dataset)
{ 

  return tf.tidy(() => {  
    tf.util.shuffle(dataset);

    const inputs = dataset.map(item => [item.a, item.b, item.c, item.d])

    const labels=[];
    for(i=0;i<dataset.length;i++)
    {
      if(dataset[i].label == 'setosa')
        labels.push(0)
      else if(dataset[i].label == 'versicolor')
        labels.push(1)
      else if(dataset[i].label == 'virginica')
        labels.push(2)
    }
  
    const inputTensor = tf.tensor2d(inputs, [inputs.length, 4]);
    const labelTensor = tf.oneHot(tf.tensor1d(labels).toInt(), IRIS_NUM_CLASSES);
    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();  

    const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));

    return {
      inputs: normalizedInputs,
      labels: labelTensor,
     // Return the min/max bounds so we can use them later.
      inputMax,
      inputMin,
   }

 });
}
