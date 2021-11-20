<h1>Virtual Coffee machine</h1>

<h1>Description</h1>
<p>
The coffee machine is modeled to work similarly to an actual coffee machine. It creates an empty coffee object, which then gets modified as per the steps for creating a coffee.
The machine adds milk, coffee grains and water to the coffee. If the coffee is created successfully, the machine registers a null error. I have used console.log
in multiple places to keep full track of the "coffee creation". Once the "coffee" script is ran the machine will display the coffee creation process in full detail
with all the steps taken for creating the coffee.
</p>

<h1>Usage:</h1>
<p>In the command line you need to pick whichever coffee you like out of the available:</p>
<ul>
<li>Short espresso: coffee -c espresso-small</li>
<li>Medium espresso: coffee -c espresso-medium</li>
<li>Large espresso: coffee -c espresso-large</li>
<li>Capuccino: coffee -c capuccino</li>
</ul>
<p>NOTE: If you attempt to select an option different from the ones listed above, you will be asked to select an available coffee type!</p>

<p>You can also select the amount of milk that your coffee can have by placing it as the second argument:</p>
<ul>
<li>Short espresso: coffee -c espresso-small -m with-milk</li>
<li>Short espresso: coffee -c espresso-small -m double-milk</li>
<li>Short espresso: coffee -c espresso-small -m no-milk</li>
</ul>
<p>NOTE: The  with-milk setting stands for the milk setting that each individual coffee type has set up by default! 
SIDENOTE: This option is completely optional, if you select only the coffee type your coffee will be made!
</p>

<p>You can also select the amount of sugar that your coffee can have by placing it as the third argument:</p>
<ul>
<li>Short espresso: coffee -c espresso-small -m with-milk -a with-sugar</li>
<li>Short espresso: coffee -c espresso-small -m with-milk -a medium-sugar</li>
<li>Short espresso: coffee -c espresso-small -m with-milk -a little-sugar</li>
<li>Short espresso: coffee -c espresso-small -m with-milk -a no-sugar</li>
</ul>
<p>NOTE: The default setting for all coffee types is "No Sugar"!
SIDENOTE: This option is completely optional, if you select only the coffee type your coffee will be made!
</p>

<p>You can also select the type of sugar that your coffee can have by placing it as the fourth argument:</p>
<ul>
<li>Short espresso: coffee -c espresso-small -m default-milk -t white-sugar</li>
<li>Short espresso: coffee -c espresso-small -m default-milk -t brown-sugar</li>
</ul>
<p>NOTE: The default setting for sugar type is "White Sugar". If the no-sugar option has been seleced as the third argument, the sugar type will display 'No Sugar'!
SIDENOTE: This option is completely optional, if you select only the coffee type your coffee will be made!
</p>

<h2>This project is a command line application:</h2>
<ul>
<li>First clone the project using git clone</li>
<li>Then you will need to install the project using npm i -g</li>
<li>When the project is all set up, in the command line just type in one of the commands listed above</li>
<li>The script will start to run and you will see the coffee machine in action</li>
</ul>
