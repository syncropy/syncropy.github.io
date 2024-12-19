// menu_tji.js
var menu_tji = {
  // Core Architecture
  "1": ["id:Menu","type:architecture","name:SyncropyDevelopmentMenu","chef:Mobley"],
  
  // Course 1: The Nothingness
  "4": ["id:Course1","type:course","parent:Menu","name:TheNothingnessBeforeExistence"],
  "5": ["id:C1Components","type:ingredients","parent:Course1","items:Honey,CacaoBeans,Butter"],
  "6": ["id:C1Technique","type:preparation","parent:Course1","method:RoastedTableside","equipment:CastIron"],
  "7": ["id:C1Narrative","type:narrative","parent:Course1","content:Consider… nothing. Not the absence of light, for there was no light. Not the absence of space, for there was no space to be absent from. Not even the absence of time, for time itself had not yet begun. Before the universe, before existence as we understand it, there was… nothing. Not emptiness. Not void. *Nothing*"],
  "8": ["id:C1Physics","type:physics","parent:Course1","config:{ particleDensity:0, energy:0, temperature:0, expansion:0, chaos:0 }"],
  
  // Course 2: The Big Bang
  "9": ["id:Course2","type:course","parent:Menu","name:TheBigBang"],
  "10": ["id:C2Components","type:ingredients","parent:Course2","items:VanillaBeanPods,SweetCream,LiquidNitrogen,WhiteChocolate,FruitGels"],
  "11": ["id:C2Technique","type:preparation","parent:Course2","steps:OpenPods,ScrapeBeans,ToastWithPod,AddCream,Simmer,RemovePod,PourPools,FreezeLN2"],
  "12": ["id:C2Narrative","type:narrative","parent:Course2","content:And then… a rupture. Not an explosion *in* space, but an explosion *of* space itself. From an infinitesimal point, the very fabric of space and time erupted forth."],
  "13": ["id:C2Physics","type:physics","parent:Course2","config:{ particleDensity:1000, energy:1e8, temperature:1e10, expansion:2, chaos:1 }"],
  
  // Course 3: Primordial Soup
  "14": ["id:Course3","type:course","parent:Menu","name:PrimordialSoup"],
  "15": ["id:C3Components","type:ingredients","parent:Course3","items:VegetableAsh,DashiStock"],
  "16": ["id:C3Technique","type:preparation","parent:Course3","steps:MortarPestleAsh,Distribute,DecantStock"],
  "17": ["id:C3Narrative","type:narrative","parent:Course3","content:4 billion years ago, deep in earth's ocean, a volcanic vent spewed molten carbon into the water in its vicinity, vaporizing some before reacting with the hydrogen and oxygen, and trace molecules of dissolved ammonia to form the first organic compounds."],
  "18": ["id:C3Physics","type:physics","parent:Course3","config:{ particleDensity:500, energy:1e6, temperature:1e4, expansion:0.5, chaos:0.3 }"]
};
