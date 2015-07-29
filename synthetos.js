/*:
	The Synthetos class let's you do method composition (mixins)
*/
var Synthetos = function Synthetos( blueprint ){
	if( this instanceof blueprint ){
		this.blueprint = blueprint;

	}else{
		return new blueprint( );
	}
};

Synthetos.prototype.compose = function compose( blueprint ){
	var properties = this.blueprint.prototype;

	for( var property in properties ){
		if( typeof properties[ property ] == "function" ){
			properties[ property ].compositeOf = blueprint.name;
		}

		blueprint.prototype[ property ] = properties[ property ];
	}

	this.boundBlueprint = blueprint;

	return this;
};

Synthetos.prototype.configure = function configure( options ){
	options = options || { };
	
	for( var option in options ){
		this.boundBlueprint.prototype[ option ] = options[ option ];	
	}

	return this;
};

global.Synthetos = Synthetos;

module.exports = Synthetos;