let API_KEY = "";
chrome.storage.local.get('apiKey', function(result) {
	  API_KEY = result.apiKey;
});
let isMobile = location.hostname == "m.youtube.com";
let isShorts = () => location.pathname.startsWith("/shorts");
let isNormalVideo = () => location.pathname.startsWith("/watch");

// debug variables print to console
const clogCentroids = true;
const clogDistanceWeights = true;
const clogCoordinateStats = true;
const clogCorruptedCentroids = false;
const clogObsoleteCentroids = false;
const clogClusteringInfo = true;
const clogVideoIds = true;

// #region get data from chrome storage
async function getCentroids(datapoint) {
	datapointDeepCopy = JSON.parse(JSON.stringify(datapoint));
	let centroids = await new Promise((resolve, reject) => {
		chrome.storage.local.get('centroids', function(result) {
			if (result.centroids) {
				resolve(result.centroids);
			} else { // if no centroids are stored
				let backup = [{"age":8508,"averageDistance":0.17631643281328926,"averageLikesToViewsRatio":0.07541323738686924,"averageViews":94575.53684210534,"coordinates":[0.347891716040732,-0.16359497823606317,0.09612283245087465,-0.138948503041255,0.059451060768527325,-0.02288195065141804,-0.2807942912663878,0.15190171918361908,-0.2527602208255673,0.0824686944014844,-0.3188788826148238,-0.10779365455923903,-0.7563420341392268,-0.1549277289767489],"count":285,"countAgeRatio":0.03349788434414669,"varianceDistance":0.007263609123509129,"varianceLikesToViewsRatio":0.0022520691816246452,"meanSquaredDifferenceLikesToViewsRatio":0.6418397167630239,"meanSquaredDifferenceDistance":2.0701286002001016},{"age":8505,"averageDistance":0.39252585611275237,"averageLikesToViewsRatio":0.04998344005674006,"averageViews":1453593.1940412526,"coordinates":[0.2228197250806835,-0.04666931849377829,0.22208891799710476,-0.07362059976631162,0.10908175030556022,0.4103767140747026,-0.2085592935284885,0.14809402259306448,-0.06804085505036353,0.10977334686478227,-0.1179678430867193,-0.07667049136745267,-1.4636755658646101,-0.08640779006967081],"count":1309,"countAgeRatio":0.15390946502057612,"varianceDistance":0.08921351780521608,"varianceLikesToViewsRatio":0.0013299874872688268,"meanSquaredDifferenceLikesToViewsRatio":1.7409536208348944,"meanSquaredDifferenceDistance":116.78049480702785},{"age":8501,"averageDistance":0.6051594103708522,"averageLikesToViewsRatio":0.05073339441382298,"averageViews":2467440.6295525474,"coordinates":[0.21073490572474451,-0.021106440224233865,0.256031455468186,-0.02908692346463141,0.20909820331008316,0.2706435447863307,-0.1147727274730024,0.14588119916413148,0.2280105802353846,0.21004210046117094,-0.15665980346568986,-0.013130934088077294,-2.4216103746063187,-0.03160403269376695],"count":961,"countAgeRatio":0.11304552405599341,"varianceDistance":0.3161097474405735,"varianceLikesToViewsRatio":0.0014109097872648114,"meanSquaredDifferenceLikesToViewsRatio":1.3558843055614838,"meanSquaredDifferenceDistance":303.78146729039116},{"age":7288,"averageDistance":0.4907822617975332,"averageLikesToViewsRatio":0.07016411550519418,"averageViews":6158351.170212763,"coordinates":[0.3700540710928767,-0.005113366674366856,0.5253350036154061,0.3972198571051644,0.06201446973947313,0.9111484491280752,-0.14342882896753542,0.1768907475078047,0.006851376795646379,0.672058975065074,4.182622452459295,-0.10450357438950814,-1.6007301334779787,-0.09583567070290784],"count":188,"countAgeRatio":0.02579582875960483,"varianceDistance":0.11690943202703971,"varianceLikesToViewsRatio":0.0005312957081957799,"meanSquaredDifferenceLikesToViewsRatio":0.09988359314080662,"meanSquaredDifferenceDistance":21.978973221083464},{"age":6844,"averageDistance":0.48604346205372684,"averageLikesToViewsRatio":0.04201647538200182,"averageViews":33000613.35057473,"coordinates":[-0.11623961479135411,0.28906070606413964,0.7132247452567267,1.685444275123942,0.05878355057270851,1.395287532601792,1.2290834314885433,0.12557734614838623,-0.15565371591324717,0.6391027643420454,2.3162342475075115,-0.11471724164767803,-1.3582793467763965,-0.09119561783083079],"count":174,"countAgeRatio":0.025423728813559324,"varianceDistance":0.08789348303055242,"varianceLikesToViewsRatio":0.000811525868306316,"meanSquaredDifferenceLikesToViewsRatio":0.14120550108529897,"meanSquaredDifferenceDistance":15.293466047316121},{"age":6826,"averageDistance":0.9203957060776312,"averageLikesToViewsRatio":0.021270209161061603,"averageViews":10649895.985074636,"coordinates":[0.11217657777852948,0.038775396298042546,0.11129353706454997,0.43067105656514787,0.06337349263525796,0.8603230779862365,0.07690165729390457,-4.693767999661506,-0.40485974703811684,-0.060299465061736855,-0.35900794938981667,0.001884021785813754,-0.6215417772020483,-0.07382671276926951],"count":134,"countAgeRatio":0.019630823322590096,"varianceDistance":0.6768174359860437,"varianceLikesToViewsRatio":0.00013935581931314017,"meanSquaredDifferenceLikesToViewsRatio":0.018673679787960782,"meanSquaredDifferenceDistance":90.69353642212985},{"age":6382,"averageDistance":0.31879045323914873,"averageLikesToViewsRatio":0.036891906058802305,"averageViews":2026237.1062801946,"coordinates":[0.22446221955747675,-0.07020470976236644,0.0654838897381458,-0.19765079912828537,0.06493322814567754,0.4456998144207417,0.003953025721848784,0.2589022036349738,0.022387396330952665,-0.14750296566560392,-0.4484850457756068,0.0019359216065700626,-0.26839581406086926,0.009416931517006554],"count":207,"countAgeRatio":0.03243497336258226,"varianceDistance":0.015346703223463444,"varianceLikesToViewsRatio":0.0005358952751384771,"meanSquaredDifferenceLikesToViewsRatio":0.11093032195366476,"meanSquaredDifferenceDistance":3.176767567256933},{"age":6071,"averageDistance":0.3996294807186297,"averageLikesToViewsRatio":2.2471381248824938,"averageViews":571913.7435897439,"coordinates":[0.33274830362124547,-0.06737767500059882,0.19978048827150438,-0.2340979441726497,0.22468821052685856,0.4690661185018534,-0.2259945398785642,0.260171745899741,0.46522604562073905,0.23177238698239408,-0.3959131419036181,-0.09653221766406966,-4.793867904873655,-0.0822757254156218],"count":234,"countAgeRatio":0.03854389721627409,"varianceDistance":0.04668203413144123,"varianceLikesToViewsRatio":1129.860795848608,"meanSquaredDifferenceLikesToViewsRatio":264387.42622857424,"meanSquaredDifferenceDistance":10.923595986757247},{"age":5681,"averageDistance":0.5904126894695286,"averageLikesToViewsRatio":21.807442790269917,"averageViews":4513119.042979942,"coordinates":[-0.0001348752774635697,-0.0632803321991507,0.12758817577053908,0.015439578631408485,0.18729309245786657,-0.6601752790468981,-0.36935422214216374,0.18938020637274722,0.023460227318291723,0.14080854488902758,-0.3111705239831888,0.10671286962305988,-2.7721905312525683,-0.05133418526583386],"count":349,"countAgeRatio":0.061432846329871504,"varianceDistance":0.1856974575385093,"varianceLikesToViewsRatio":47485.15613218967,"meanSquaredDifferenceLikesToViewsRatio":16572319.490134196,"meanSquaredDifferenceDistance":64.80841268093975},{"age":4760,"averageDistance":0.5526792063121072,"averageLikesToViewsRatio":0.06444977491956397,"averageViews":543134.5405405414,"coordinates":[0.04032738501441764,-0.011026149463698334,0.10880583718357188,-0.19024951389435543,0.22614849091406203,-0.9854738643487632,-0.5571431721402865,0.13475695698303777,-0.25811399566790955,0.23370213260242875,-0.29339572484604104,-0.03790073067287114,-6.343909838274575,-0.047528157536269475],"count":222,"countAgeRatio":0.046638655462184875,"varianceDistance":0.1791650630309911,"varianceLikesToViewsRatio":0.007739903196957547,"meanSquaredDifferenceLikesToViewsRatio":1.7182585097245755,"meanSquaredDifferenceDistance":39.77464399288003},{"age":4383,"averageDistance":0.3269301655947223,"averageLikesToViewsRatio":0.006130853934037421,"averageViews":644796.3226351351,"coordinates":[0.1601917088413924,-0.06456350078807743,0.18989745268200411,-0.19225537993590078,0.21419390483063847,1.1420617493990652,1.8966519797191488,0.14595463213610294,-0.30974997516103425,0.17901983161407184,-0.3314422478948959,-0.02833996528932434,-1.9309643946050965,-0.03338253729743129],"count":592,"countAgeRatio":0.135067305498517,"varianceDistance":0.09378049390094946,"varianceLikesToViewsRatio":0.00008062953103905297,"meanSquaredDifferenceLikesToViewsRatio":0.04773268237511936,"meanSquaredDifferenceDistance":55.51805238936208},{"age":3582,"averageDistance":1.1201988943656616,"averageLikesToViewsRatio":0.004543819843885637,"averageViews":2153743242.5519114,"coordinates":[-0.35169015601760867,0.9324154676795451,0.6278053628125346,5.044403540468942,0.21854963572737698,1.0666540050575106,1.2621326994076554,0.13047913132177755,-0.4422398273737082,0.3684851084029585,0.6096027090844764,0.596445806830851,-2.4170864901615197,-0.08496394872892161],"count":183,"countAgeRatio":0.05108877721943048,"varianceDistance":0.09921127271021199,"varianceLikesToViewsRatio":0.0000036130809242607587,"meanSquaredDifferenceLikesToViewsRatio":0.0006611938091397188,"meanSquaredDifferenceDistance":18.155662905968793},{"age":3389,"averageDistance":0.6201568855470831,"averageLikesToViewsRatio":0.042725867440959485,"averageViews":23941245.782312937,"coordinates":[-0.5706703602772952,-0.06852272288790194,0.18168156661351142,-0.12745444466977043,0.22323726949542017,-0.11658025761459367,-0.22631694316694387,0.18193224225745203,0.15345985288755398,0.16530475896484648,-0.1745571951076816,0.0683507368705454,-1.2146875774728196,0.14121681668661168],"count":147,"countAgeRatio":0.043375627028622014,"varianceDistance":0.07370121886049803,"varianceLikesToViewsRatio":0.0028294230625215424,"meanSquaredDifferenceLikesToViewsRatio":0.4159251901906667,"meanSquaredDifferenceDistance":10.83407917249321},{"age":2852,"averageDistance":1.1303819275302063,"averageLikesToViewsRatio":0.034248816151652144,"averageViews":1847554.9848484846,"coordinates":[0.38169910724905487,-0.07435538095208002,0.26514510303156225,-0.1641674997729279,0.24852325911836715,0.024451517334756624,-0.38703587613805956,-0.03718808051537381,-0.06732217342646757,0.12768693684923452,-0.2349008469885684,0.8704637150249637,-9.916402489520923,-0.032052823916375775],"count":66,"countAgeRatio":0.02314165497896213,"varianceDistance":0.36085465256867494,"varianceLikesToViewsRatio":0.0003545058239302898,"meanSquaredDifferenceLikesToViewsRatio":0.023397384379399127,"meanSquaredDifferenceDistance":23.816407069532545},{"age":2604,"averageDistance":1.476775384197267,"averageLikesToViewsRatio":2540.689189189193,"averageViews":1,"coordinates":[-1.642007424265606,-0.08066138529085,-3.279802214340538,-0.16442143145253552,-3.3218232578131737,0.8576762275421177,0.8233996705845961,0.3068194519810509,0.24917459966429656,-3.185611371001446,-0.31832527372600367,-12.978125334155981,-7.248445402065,-0.03245814213013053],"count":444,"countAgeRatio":0.17050691244239632,"varianceDistance":0.34617357754832434,"varianceLikesToViewsRatio":94073341.35384715,"meanSquaredDifferenceLikesToViewsRatio":41768563561.10813,"meanSquaredDifferenceDistance":153.701068431456},{"age":2543,"averageDistance":1.942224939524266,"averageLikesToViewsRatio":2216.0487804878053,"averageViews":1,"coordinates":[-1.6749137794908149,-0.08112860531120637,-3.520567009254277,-0.1656341211645622,-3.5701698541392357,0.8921946870865244,0.8594551004180504,0.31132425167765104,0.26044979119512324,-3.410934604982199,-0.320795645380274,-39.52348067934849,-8.876895203848136,-0.03269226369544756],"count":41,"countAgeRatio":0.016122689736531654,"varianceDistance":0.9418553174716504,"varianceLikesToViewsRatio":19711029.802498512,"meanSquaredDifferenceLikesToViewsRatio":808152221.902439,"meanSquaredDifferenceDistance":38.616068016337664},{"age":2379,"averageDistance":1.9920929545498889,"averageLikesToViewsRatio":2831.783333333334,"averageViews":1,"coordinates":[-1.047413828316369,-0.08001664719891523,-3.03430574312597,-0.16349226681062878,-3.065322357114682,0.7253026149905121,0.4920178757027036,0.3088610338797922,0.27012570491408383,-2.957338894573188,-0.316549386783053,-29.164134513160466,-13.237112165634384,-0.03227694424940628],"count":60,"countAgeRatio":0.025220680958385876,"varianceDistance":0.5532791351710141,"varianceLikesToViewsRatio":20018154.469722215,"meanSquaredDifferenceLikesToViewsRatio":1201089268.183333,"meanSquaredDifferenceDistance":33.19674811026085},{"age":2127,"averageDistance":0.3412974419974364,"averageLikesToViewsRatio":3510.394230769232,"averageViews":1,"coordinates":[-1.783693716976299,-0.07912735805309705,-2.635142373157826,-0.16112986674310376,-2.655373701448014,0.9460259989819221,1.097671169545486,0.2950466898932322,0.20677628818613888,-2.5847027470519315,-0.31160447572364613,-6.3486112034048325,-4.546881197770885,-0.031822856793054945],"count":104,"countAgeRatio":0.048895157498824636,"varianceDistance":0.01219112928674695,"varianceLikesToViewsRatio":160838650.75804365,"meanSquaredDifferenceLikesToViewsRatio":16727219678.83654,"meanSquaredDifferenceDistance":1.2678774458216828},{"age":1783,"averageDistance":0.43416096902243123,"averageLikesToViewsRatio":1606.4545454545455,"averageViews":1,"coordinates":[-0.9416577988189679,-0.07777957338905667,-2.336516262870155,-0.15836937122891423,-2.3507350964609093,0.860484804319372,0.9207325307420843,0.29064964608977933,0.20417850072927582,-2.2978171898660755,-0.30609042048734414,-7.1477534570090455,-4.8641014896981245,-0.03128763634816977],"count":66,"countAgeRatio":0.03701626472237801,"varianceDistance":0.02013372532452888,"varianceLikesToViewsRatio":34168228.46005509,"meanSquaredDifferenceLikesToViewsRatio":2255103078.363636,"meanSquaredDifferenceDistance":1.328825871418906},{"age":1683,"averageDistance":0.176283927027888,"averageLikesToViewsRatio":0.051805753165678384,"averageViews":1138907.7783094095,"coordinates":[0.43082666231378264,-0.06728813594693728,0.4008556170640835,-0.14705341388994242,0.4112487282947982,0.06851347730666225,-0.5170978442489541,0.14795223176107372,-0.087222410839666,0.39416929321746075,-0.25222663080147834,0.052774539320258815,-0.3289400566553888,-0.027681239608529893],"count":1254,"countAgeRatio":0.7450980392156863,"varianceDistance":0.020396948152102752,"varianceLikesToViewsRatio":0.0007352981432811186,"meanSquaredDifferenceLikesToViewsRatio":0.9220638716745228,"meanSquaredDifferenceDistance":25.57777298273685}] 
				resolve(backup);
			}
		});
	});
	if (centroids.length == 0) {
		centroids.push(datapointDeepCopy);
	} 
	return centroids;
}

async function getCoordinatesStats(datapoint) {
	let coordinatesStats = await new Promise((resolve, reject) => {
		chrome.storage.local.get(['coordinatesStats'], function(result) {
			if (result.coordinatesStats) {
				resolve(result.coordinatesStats);
			} else { // if no coordinatesStats are stored
				let backup = {"average":[-9.787119269664224,25588.087862213415,-2.4932298026391146,55841065.17490994,-11.922599038718634,23.049276200859435,81022696002.05196,4.230941006139505,2457.3840335156547,-2.651609729960537,6639795.030257217,20.60966661584953,-6.68826996827143,0.0007800570093855062],"correlationMatrix":[[1,0.0449471827751476,0.578128080489528,-0.031427661831119835,0.5656882828670736,-0.09991083054384405,-0.18406298244310348,0.026344732926801364,-0.05374268622123768,0.5661102970942647,0.05159860708944731,0.012176446559828026,0.23491208001015024,-0.06326774748376421],[0.0449471827751476,1,0.042068672250428284,0.22373664059885043,0.02743110138382992,0.060235982214439286,0.11638995112550987,0.0030583905251206542,-0.008006734890293108,0.03510623821791951,0.08561806478071392,-0.0017678995085553507,0.018556831061311268,-0.0025049088070966253],[0.578128080489528,0.042068672250428284,1,0.08986382928678167,0.9939283648766924,-0.20853758890281565,-0.2281583306855091,-0.076790232752618,-0.10815450962450282,0.9515439860268783,0.13939722709007213,0.01697127479252024,0.4534503654020301,-0.009134589872081671],[-0.031427661831119835,0.22373664059885043,0.08986382928678167,1,0.05558897925275024,0.1318344483148947,0.1672883061126472,0.011123259509250454,-0.019926520647698048,0.07069788752723552,0.15029886368344558,-0.005050008902108721,0.04612569856106127,-0.0049918998481501674],[0.5656882828670736,0.02743110138382992,0.9939283648766924,0.05558897925275024,1,-0.25073672637554534,-0.25202810870364034,-0.08375662795799704,-0.11024813011856667,0.9517173640686507,0.10659908761629011,0.014980008416717967,0.45714584082095766,0.01355194683067302],[-0.09991083054384405,0.060235982214439286,-0.20853758890281565,0.1318344483148947,-0.25073672637554534,0.9999999999999998,0.6828969071966852,0.03360347708136995,0.04418120129272218,-0.2444886197625798,0.10878210490378921,0.029569909765240373,-0.1687031880622652,-0.030194059246679516],[-0.18406298244310348,0.11638995112550987,-0.2281583306855091,0.1672883061126472,-0.25202810870364034,0.6828969071966852,1,0.04062940244783741,0.011211834945398614,-0.24476786360610406,0.04933964401357072,0.047145871794663154,-0.12211513562127398,-0.012822415127620295],[0.026344732926801364,0.0030583905251206542,-0.076790232752618,0.011123259509250454,-0.08375662795799704,0.03360347708136995,0.04062940244783741,1,0.052630639434508186,-0.07570395542119195,0.0382138121417607,0.0023024445230103176,-0.07179850506092221,-0.088061002224202],[-0.05374268622123768,-0.008006734890293108,-0.10815450962450282,-0.019926520647698048,-0.11024813011856667,0.04418120129272218,0.011211834945398614,0.052630639434508186,1,-0.10919767471564293,-0.020392614842713614,-0.005530474674053255,-0.045734847196045335,-0.004119439088705148],[0.5661102970942647,0.03510623821791951,0.9515439860268783,0.07069788752723552,0.9517173640686507,-0.2444886197625798,-0.24476786360610406,-0.07570395542119195,-0.10919767471564293,1,0.14927688332466432,0.0083801800282932,0.4744588756514003,-0.056723533759418444],[0.05159860708944731,0.08561806478071392,0.13939722709007213,0.15029886368344558,0.10659908761629011,0.10878210490378921,0.04933964401357072,0.0382138121417607,-0.020392614842713614,0.14927688332466432,1,-0.010756947243933864,0.08316440167849236,-0.009843629436466893],[0.012176446559828026,-0.0017678995085553507,0.01697127479252024,-0.005050008902108721,0.014980008416717967,0.029569909765240373,0.047145871794663154,0.0023024445230103176,-0.005530474674053255,0.0083801800282932,-0.010756947243933864,1,0.0006488799477953657,0.013761477585543358],[0.23491208001015024,0.018556831061311268,0.4534503654020301,0.04612569856106127,0.45714584082095766,-0.1687031880622652,-0.12211513562127398,-0.07179850506092221,-0.045734847196045335,0.4744588756514003,0.08316440167849236,0.0006488799477953657,1,0.010430052268390338],[-0.06326774748376421,-0.0025049088070966253,-0.009134589872081671,-0.0049918998481501674,0.01355194683067302,-0.030194059246679516,-0.012822415127620295,-0.088061002224202,-0.004119439088705148,-0.056723533759418444,-0.009843629436466893,0.013761477585543358,0.010430052268390338,0.9999999999999999]],"count":8594,"covarianceSum":[[12282563.34062275,5271537613.496563,7060117.725659182,-4040021481953.229,6202248.346387452,-101310.12660017323,-6534478079528028,132474.9733333627,-262344251.40695274,7073545.046941249,400160688468.48065,2102261.01350246,1531914.1861032078,-453.0440461260343],[5271537613.496563,1119773948659905.4,4905320152.404665,274618246271033120,2871678968.4757485,583199252.6293346,39453052461573700000,146843136.96926606,-373188544994.9461,4188331404.284453,6339901703217038,-2914367518.530669,1155456433.7533777,-171265.8001668995],[7060117.725659182,4905320152.404665,12140614.156180989,11485035609784.031,10834350.361115895,-210232.7925001635,-8052979685616425,-383903.30126941664,-524895243.1468141,11820633.717590872,1074796888902.1821,2913106.4647387783,2939914.268493164,-65.03137399823011],[-4040021481953.229,274618246271033120,11485035609784.031,1.345255111221602e+21,6378498934479.258,1399029957540.106,6.215382397873001e+22,585369283022.0112,-1017985225518969.6,9244859717625.984,12198599135648625000,-9124646160132.008,3147964769273.982,-374094856.8647801],[6202248.346387452,2871678968.4757485,10834350.361115895,6378498934479.258,9786148.180848274,-226944.48208162148,-7986469152134826,-375941.79647475114,-480379871.9254769,10614644.40765076,737923461894.174,2308551.2173691425,2661002.288111042,86.62058876932049],[-101310.12660017323,583199252.6293346,-210232.7925001635,1399029957540.106,-226944.48208162148,83716.11446922018,2001518560722253,13950.323659773401,17805317.72453184,-252205.61037109958,69648846312.54327,421479.1484212857,-90826.46313299135,-17.85005600084487],[-6534478079528028,39453052461573700000,-8052979685616425,6.215382397873001e+22,-7986469152134826,2001518560722253,1.0269152161080792e+26,590749365508139,158252895960613900,-8843277528633296,1.1064078376890697e+21,23535993121009490,-2302615225452297,-265491533551.61884],[132474.9733333627,146843136.96926606,-383903.30126941664,585369283022.0112,-375941.79647475114,13950.323659773401,590749365508139,2058452.3487308424,105176019.74533333,-387240.2958790052,121322879856.21199,162735.0669037475,-191677.1715221076,-258.14729659751407],[-262344251.40695274,-373188544994.9461,-524895243.1468141,-1017985225518969.6,-480379871.9254769,17805317.72453184,158252895960613900,105176019.74533333,1939840032018.6885,-542235456.1850046,-62850366265485.83,-379460810.263376,-118526312.33009177,-11722.887382280722],[7073545.046941249,4188331404.284453,11820633.717590872,9244859717625.984,10614644.40765076,-252205.61037109958,-8843277528633296,-387240.2958790052,-542235456.1850046,12709782.03718619,1177642709718.9543,1471783.6125743904,3147401.9397001644,-413.1862670540511],[400160688468.48065,6339901703217038,1074796888902.1821,12198599135648625000,737923461894.174,69648846312.54327,1.1064078376890697e+21,121322879856.21199,-62850366265485.83,1177642709718.9543,4896178120739434000,-1172571154402.3118,342413322073.2134,-44503832.17990425],[2102261.01350246,-2914367518.530669,2913106.4647387783,-9124646160132.008,2308551.2173691425,421479.1484212857,23535993121009490,162735.0669037475,-379460810.263376,1471783.6125743904,-1172571154402.3118,2426569033.4075856,59476.48036015225,1385.0802642298397],[1531914.1861032078,1155456433.7533777,2939914.268493164,3147964769273.982,2661002.288111042,-90826.46313299135,-2302615225452297,-191677.1715221076,-118526312.33009177,3147401.9397001644,342413322073.2134,59476.48036015225,3461947.9549545674,39.651562038789685],[-453.0440461260343,-171265.8001668995,-65.03137399823011,-374094856.8647801,86.62058876932049,-17.85005600084487,-265491533551.61884,-258.14729659751407,-11722.887382280722,-413.1862670540511,-44503832.17990425,1385.0802642298397,39.651562038789685,4.174232230012679]],"meanSquaredDifference":[12282563.34062275,1119773948659905.4,12140614.156180989,1.345255111221602e+21,9786148.180848274,83716.11446922018,1.0269152161080792e+26,2058452.3487308424,1939840032018.6885,12709782.03718619,4896178120739434000,2426569033.4075856,3461947.9549545674,4.174232230012679],"variance":[1429.534839457955,130327507991.14355,1413.0137518832623,156570660058380100,1138.983726821261,9.743495631892479,1.1951992738688073e+22,239.57778732900866,225772815.6446332,1479.2576858922475,569853133233174.4,282421.9079850542,402.9269035096098,0.00048582777351171777]}
				resolve(backup);
			}
		});
	});
	// if any of the coordinates is NaN, set it to 0
	for (let i = 0; i < coordinatesStats.average.length; i++) {
		if (isNaN(coordinatesStats.average[i])) {
			coordinatesStats.average[i] = 0;
		}
		if (isNaN(coordinatesStats.variance[i])) {
			coordinatesStats.variance[i] = 0;
		}
		if (isNaN(coordinatesStats.meanSquaredDifference[i])) {
			coordinatesStats.meanSquaredDifference[i] = 0;
		}
	}

	return coordinatesStats;
}
// #endregion

function clog(/* arguments */) {
	let prefix = "[Youtube-Video-Stats] ";
	let args = Array.prototype.slice.call(arguments);
	if (typeof args[0] == "string") {
		args[0] = prefix + args[0];
	} else {
		args.unshift(prefix);
	}
	console.log.apply(console, args);
}

async function getVideoInfo(videoId) {
	const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=statistics,contentDetails,snippet`;	
	const response = await fetch(url);
	const data = await response.json();
	let commentCount = data.items[0].statistics.commentCount;
	let viewCount = data.items[0].statistics.viewCount ? data.items[0].statistics.viewCount : -100;
	let likeCount = data.items[0].statistics.likeCount;
	let publishedAt = data.items[0].snippet.publishedAt 
	let duration = data.items[0].contentDetails.duration;
	let channelId = data.items[0].snippet.channelId;
	let channelUrl = `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&key=${API_KEY}&part=statistics`;
	const response2 = await fetch(channelUrl);
	const data2 = await response2.json();
	let subscriberCount = data2.items[0].statistics.subscriberCount;
	let videoAge = getVideoAge(publishedAt);
	let durationSeconds = getDurationSeconds(duration);
	return {
		"commentCount": commentCount ? commentCount : -100,
		"viewCount": viewCount,
		"likeCount": likeCount,
		"videoAge": videoAge,
		"duration": durationSeconds,
		"subscriberCount": subscriberCount
	};
}

function getVideoAge(publishedAt) {
	let videoAge = Date.now() - new Date(publishedAt).getTime();
	return videoAge;
}

function getDurationSeconds(duration) {
	if (duration == "P0D") {
		return -100;
	} else {
		var a = duration.match(/P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/);
		var days = a[1] ? parseInt(a[1]) : 0;
		var hours = a[2] ? parseInt(a[2]) : 0;
		var minutes = a[3] ? parseInt(a[3]) : 0;
		var seconds = a[4] ? parseInt(a[4]) : 0;
		return (days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60) + seconds;
	}
}

function removeCorruptedCentroids(centroids) {
	centroids.forEach(function (centroid) {	
		for(let key in centroid) {
			if (Array.isArray(centroid[key])) {
				if (centroid[key].includes(NaN) || centroid[key].includes(undefined) || centroid[key].includes(null)) {
					if (clogCorruptedCentroids) {
						clog("Corrupted centroid found: ", key, " is ", centroid[key]);
					}
					centroids.splice(centroids.indexOf(centroid), 1);
			}
			} else {
				if (isNaN(centroid[key]	) || centroid[key] == undefined || centroid[key] == null) {
					if (clogCorruptedCentroids) {
						clog("Corrupted centroid found: ", key, " is ", centroid[key]);
					}
					centroids.splice(centroids.indexOf(centroid), 1);
				}
			}
		}
	});
	return centroids;
}

function removeObsoleteCentroids(centroids) {
	let countAgeRatioAverage = 0;
	centroids.forEach(function(centroid) {
		countAgeRatioAverage += Math.log10(centroid.countAgeRatio);
	});
	countAgeRatioAverage = countAgeRatioAverage / centroids.length;
	let countAgeRatioStandardDeviation = 0;
	centroids.forEach(function(centroid) {
		countAgeRatioStandardDeviation += Math.pow(Math.log10(centroid.countAgeRatio) - countAgeRatioAverage, 2);
	});
	countAgeRatioStandardDeviation = Math.sqrt(countAgeRatioStandardDeviation / centroids.length);
	countAgeRatioStandardDeviation = countAgeRatioStandardDeviation == 0 ? Math.log10(Math.sqrt(Math.pow(10, countAgeRatioAverage))) : countAgeRatioStandardDeviation;
	centroids.forEach(function(centroid) {
		let percentile = (1 + erf((Math.log10(centroid.countAgeRatio) - countAgeRatioAverage) / (countAgeRatioStandardDeviation * Math.sqrt(2)))) / 2;
		if (centroid.age > 300 ) {
			if (percentile <= 0.32 && centroid.count <= 3) {
				centroids.splice(centroids.indexOf(centroid), 1);
				clog("Obsolete centroid found");
			} else if (percentile <= 0.20 && centroid.count <= 10) {
				centroids.splice(centroids.indexOf(centroid), 1);
				clog("Obsolete centroid found");
			} else if (percentile <= 0.13 && centroid.count <= 30) {
				centroids.splice(centroids.indexOf(centroid), 1);
				clog("Obsolete centroid found");
			} else if (percentile <= 0.08 && centroid.count <= 100) {
				centroids.splice(centroids.indexOf(centroid), 1);
				clog("Obsolete centroid found");
			} else if (percentile <= 0.05) {
				centroids.splice(centroids.indexOf(centroid), 1);
				clog("Obsolete centroid found");
			}
		}
	});
	return centroids;
}

function saveCentroids(centroids) {
	centroids = removeCorruptedCentroids(centroids);
	centroids.forEach(function(centroid) {
		centroid.age++;
		centroid.countAgeRatio = centroid.count / centroid.age;
	});
	centroids = removeObsoleteCentroids(centroids);	
	if (clogCentroids) {
		clog("centroids", centroids);
	}
	// save centroids to chrome storage
	chrome.storage.local.set({'centroids':  centroids, function() {
		if (chrome.runtime.lastError) {
			let smallestCountAgeRatio = Math.min(...centroids.map(centroid => centroid.countAgeRatio));
			let smallestCountAgeRatioIndex = centroids.findIndex(centroid => centroid.countAgeRatio == smallestCountAgeRatio);
			let averageDistance = centroids[smallestCountAgeRatioIndex].averageDistance;
			let remainingCentroids = centroids.splice(smallestCountAgeRatioIndex, 1);
			remainingCentroids.forEach(function(centroid) {
				centroid.averageDistance += averageDistance / remainingCentroids.length;
			});
			centroids.splice(smallestCountAgeRatioIndex, 1);
			chrome.storage.local.set({'centroids':  centroids, function() {
				if (chrome.runtime.lastError) {
					clog("Error saving centroids to chrome storage");
				}
			}
			});
		} else {
			clog("Centroids saved to chrome storage");
		}
	}});
	//exportObjectToLocalFolder(centroids, "centroids") // EXPORT
}

function exportObjectToLocalFolder(object, objectName) {
	let json = JSON.stringify(object);
	let blob = new Blob([json], {type: "application/json"});
	let url = window.URL.createObjectURL(blob);
	let a = document.createElement('a');
	a.href = url;
	a.download = objectName + ".json";
	a.click();
	window.URL.revokeObjectURL(url);
}

function calculateDistanceWeights(covarianceMatrix) {
	let distanceWeights = Array(covarianceMatrix.length).fill(0);
	let numberOfCoordinates = covarianceMatrix.length;
	for (let i = 0; i < covarianceMatrix.length; i++) {
		// get max value excluding diagonal
		let maxValue = 0;
		for (let j = 0; j < covarianceMatrix[i].length; j++) {
			let value = Math.abs(covarianceMatrix[i][j]);
			if (i != j && value > maxValue) {
				distanceWeights[i] = value; 
				maxValue = value;
			}
		}	
		distanceWeights[i] =  1/numberOfCoordinates + (1-distanceWeights[i])*(numberOfCoordinates-1)/numberOfCoordinates;
	}
	if (clogDistanceWeights) {
		clog("Distance weights: ", distanceWeights);
	}
	return distanceWeights;
}

function sequentialKMeans(centroids, datapoint, covarianceMatrix) {
	let thresholds = [];
	let distances = [];
	let distancesMinusThreshold = [];
	let minDistance = 9999;
	let distanceWeights = calculateDistanceWeights(covarianceMatrix);
	// find minimum distance between datapoint and centroids
	centroids.forEach(function (centroid) {
		let distance = getEuclideanDistance(centroid.coordinates, datapoint.coordinates, distanceWeights);
		distances.push(distance);
		let avgDist = centroid.averageDistance == 0 ? distance / 3 : centroid.averageDistance;
		let multiplier = centroid.age < 100 ? 1 : (centroid.age < 300 ? (centroid.age - 100)/(300 - 100) * (0.75-1) + 1 : (centroid.age < 1000 ? (centroid.age - 300)/(1000 - 300) * (0.5-0.75) + 0.75 : (centroid.age < 3000 ? (centroid.age - 1000)/(3000 - 1000) * (0.25-0.5) + 0.5 : (centroid.age < 10000 ? 0.25 : (centroid.age < 30000 ? (centroid.age - 10000)/(30000 - 10000) * (0.5-0.25) + 0.25 : (centroid.age < 100000 ? (centroid.age - 30000)/(100000 - 30000) * (0.75-0.5) + 0.5 : 0.75))))));
		let varDist = centroid.varianceDistance == 0 ? Math.sqrt(distance) : centroid.varianceDistance;
		let stdDist = Math.sqrt(varDist) > multiplier * 4 ? (centroid.age > 10000 ? 1 : multiplier * 4) : Math.sqrt(varDist);
		let threshold = (avgDist + 2 * stdDist) * multiplier;
		thresholds.push(threshold);
		let distanceMinusThreshold = distance - threshold;
		distancesMinusThreshold.push(distanceMinusThreshold);
		if (distanceMinusThreshold <= 0 && distance < minDistance) {
			minDistance = distance;
		}
	});
	let index = distances.indexOf(minDistance);
	if (minDistance == 9999) {
		if(clogClusteringInfo) {
			clog("Min distance is greater than threshold");
			clog("Creating new centroid");
		}
		centroids.push(datapoint);
		index = centroids.length - 1;
	} else { 
		if (clogClusteringInfo) {
			clog("Datapoint clustered to centroid with index ", index);
		}
		centroids[index] = updateCentroid(centroids[index], datapoint, minDistance);
	}
	let centroidsCopy = JSON.parse(JSON.stringify(centroids));
	saveCentroids(centroidsCopy);
	return centroids[index];
}

function updateCentroid(centroid, datapoint, distance) {
	centroid.count += 1;
	// update centroid coordinates
	let coordinates = centroid.coordinates;
	let newCoordinates = [];
	for (let i = 0; i < coordinates.length; i++) {
		let newCoordinateStats = movingAverageAndVariance(centroid.count, coordinates[i], 0, datapoint.coordinates[i]);
		newCoordinates.push(newCoordinateStats.average);
	}
	centroid.coordinates = newCoordinates;
	// Update distance stats
	let newDistanceStats = movingAverageAndVariance(centroid.count, centroid.averageDistance, centroid.meanSquaredDifferenceDistance, distance);
	centroid.averageDistance = newDistanceStats.average;
	centroid.varianceDistance = newDistanceStats.variance;
	centroid.meanSquaredDifferenceDistance = newDistanceStats.meanSquaredDifference;
	// update likes to views ratio stats 
	let newLikesToViewsRatioStats = movingAverageAndVariance(centroid.count, centroid.averageLikesToViewsRatio, centroid.meanSquaredDifferenceLikesToViewsRatio, datapoint.averageLikesToViewsRatio);
	centroid.averageLikesToViewsRatio = newLikesToViewsRatioStats.average;
	centroid.varianceLikesToViewsRatio = newLikesToViewsRatioStats.variance;
	centroid.meanSquaredDifferenceLikesToViewsRatio = newLikesToViewsRatioStats.meanSquaredDifference;
	// update age stats
	let newViewsStats = movingAverageAndVariance(centroid.count, centroid.averageViews, 0, datapoint.averageViews);
	centroid.averageViews = newViewsStats.average;
	return centroid;
}

function movingAverageAndVariance(count, average, meanSquaredDifference, newValue) {
	stats = {
		"average": average,
		"meanSquaredDifference": meanSquaredDifference,
		"variance": 0
	};
	let delta = newValue - stats.average;
	stats.average += delta / count;
	let delta2 = newValue - stats.average;
	stats.meanSquaredDifference += delta * delta2;
	stats.variance = stats.meanSquaredDifference / (count==1?1:(count-1));
	return stats;
}

function movingCovariance(x,y,xAverage,yAverage,count,covarianceSum) {
	stats = {
		"covarianceSample": 0,
		"covarianceSum": covarianceSum,
	}
	let xDiff = x - xAverage;
	xAverage += xDiff / count;
	yAverage += (y - yAverage) / count;
	stats.covarianceSum += xDiff * (y - yAverage); 
	stats.covarianceSample = stats.covarianceSum / (count==1?1:(count-1));
	return stats;
}

function getEuclideanDistance(coordinates1, coordinates2, weights) {
	let distance = 0;
	let weightSum = 0;
	for (let i = 0; i < coordinates1.length; i++) {
		distance += Math.pow(coordinates1[i] - coordinates2[i], 2) * weights[i];
		weightSum += weights[i];		
	}
	distance = distance/weightSum;
	return Math.sqrt(distance);
}

function calculateScore(centroid, datapoint) {
	let mu = centroid.averageLikesToViewsRatio;
	let variance = centroid.varianceLikesToViewsRatio == 0 ? Math.abs(centroid.averageLikesToViewsRatio) : centroid.varianceLikesToViewsRatio;
	let sigma = Math.sqrt(variance);
	let value = (datapoint.averageLikesToViewsRatio * datapoint.averageViews + centroid.averageLikesToViewsRatio * centroid.averageViews) / (datapoint.averageViews + centroid.averageViews);
	let adjSigma = sigma * Math.pow(datapoint.averageViews / (datapoint.averageViews + centroid.averageViews), 1/2);
	let percentile = (1 + erf((value - mu) / (adjSigma * Math.sqrt(2)))) / 2;
	let dislike = 1 - percentile;
	let dislikeVar = Math.abs(dislike - 0.5);
	let normDislikeVar = dislikeVar / 0.229167;
	normDislikeVar = dislike < 0.5 ? -normDislikeVar : normDislikeVar;
	let avg = -1.2;
	let std = 0.55;
	let normDislike = normDislikeVar * std + avg;
	let newDislike = Math.pow(10, normDislike);
	let score = 1 - newDislike;	
	score = score /0.996;
	score = score < 0 ? 0 : score;
	score = score > 1 ? 1 : score;
	return score
}

function erf(x) {
	let sign = (x >= 0) ? 1 : -1;
	x = Math.abs(x);
	let a1 =  0.254829592;
	let a2 = -0.284496736;
	let a3 =  1.421413741;
	let a4 = -1.453152027;
	let a5 =  1.061405429;
	let p  =  0.3275911;
	let t = 1.0/(1.0 + p*x);
	let y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
	return sign * y; 
}


function normalizeCoordinates(datapoint, coordinatesStats) {
	let normalizedCoordinates = [];
	for (let i = 0; i < coordinatesStats.average.length; i++) {
		let standardizedCoordinate = datapoint.coordinates[i] - coordinatesStats.average[i];
		stdev = coordinatesStats.variance[i] == 0 ? 1 : Math.sqrt(coordinatesStats.variance[i]);
		normalizedCoordinates.push(standardizedCoordinate / stdev);
	}
	return normalizedCoordinates;
}

function updateAndSaveCoordinateStats(coordinatesStats, datapoint, normalizedCoordinates) {
	for (let i = 0; i < coordinatesStats.average.length; i++) {
		// coordinates stats
		let updatedStats = movingAverageAndVariance(
			coordinatesStats.count, coordinatesStats.average[i],
			coordinatesStats.meanSquaredDifference[i], datapoint.coordinates[i]
		);
		coordinatesStats.variance [i] = updatedStats.variance;
		coordinatesStats.meanSquaredDifference[i] = updatedStats.meanSquaredDifference; 
		// covariance stats
		if (coordinatesStats.count > 1) {
			let covarianceStats = {};
			for (let j = i; j < coordinatesStats.average.length; j++) {
				covarianceStats = movingCovariance(
					datapoint.coordinates[i], datapoint.coordinates[j],
					coordinatesStats.average[i], coordinatesStats.average[j],
					coordinatesStats.count, coordinatesStats.covarianceSum[i][j]
				);
				coordinatesStats.correlationMatrix[i][j] = covarianceStats.covarianceSample/(Math.sqrt(coordinatesStats.variance[i]) * Math.sqrt(coordinatesStats.variance[j]));
				coordinatesStats.correlationMatrix[i][j] = coordinatesStats.correlationMatrix[i][j] > 1 ? 1 : coordinatesStats.correlationMatrix[i][j];
				coordinatesStats.correlationMatrix[i][j] = coordinatesStats.correlationMatrix[i][j] < -1 ? -1 : coordinatesStats.correlationMatrix[i][j];
				coordinatesStats.correlationMatrix[j][i] = coordinatesStats.correlationMatrix[i][j];
				coordinatesStats.covarianceSum[i][j] = covarianceStats.covarianceSum;
				coordinatesStats.covarianceSum[j][i] = coordinatesStats.covarianceSum[i][j];
			}
		}
		coordinatesStats.average[i] = updatedStats.average;
	}
	coordinatesStats.count++;
	chrome.storage.local.set({coordinatesStats: coordinatesStats});
	if (clogCoordinateStats) {
		clog("coordinatesStats", coordinatesStats);
	}
	//exportObjectToLocalFolder(coordinatesStats, "coordinatesStats"); // EXPORT TO LOCAL FOLDER
	return coordinatesStats;
}

// initialize datapoint
async function initializeDatapoint(videoData) {
	let videoDataLog = {
		"commentCount": (videoData.commentCount == undefined || isNaN(videoData.commentCount) || videoData.commentCount <= 1) ? -100 : Math.log(videoData.commentCount),
		"viewCount": (videoData.viewCount == undefined || isNaN(videoData.viewCount) || videoData.viewCount <= 1) ? -100 : Math.log(videoData.viewCount),
		"videoAge": (videoData.videoAge == undefined || isNaN(videoData.videoAge) || videoData.videoAge <= 1) ? -100 : Math.log(videoData.videoAge),
		"duration": (videoData.duration == undefined || isNaN(videoData.duration) || videoData.duration <= 1) ? -100 : Math.log(videoData.duration),
		"subscriberCount": (videoData.subscriberCount == undefined || isNaN(videoData.subscriberCount) || videoData.subscriberCount <= 1) ? -100 : Math.log(videoData.subscriberCount),
		"subscriberViewCountRatio": (videoData.viewCount / videoData.subscriberCount == undefined || isNaN(videoData.viewCount / videoData.subscriberCount) || videoData.viewCount / videoData.subscriberCount == null) ? -1 : videoData.viewCount / videoData.subscriberCount,
		"subscriberViewCountRatio2": Math.log(videoData.viewCount / (videoData.subscriberCount + videoData.viewCount)) == undefined || isNaN(Math.log(videoData.viewCount / (videoData.subscriberCount + videoData.viewCount))) || Math.log(videoData.viewCount / (videoData.subscriberCount + videoData.viewCount)) == null ? -100 : Math.log(videoData.viewCount / (videoData.subscriberCount + videoData.viewCount))
	};
	let datapoint = {
		"coordinates": [
			/*0*/ videoDataLog.commentCount,
			/*1*/ Math.exp(videoDataLog.commentCount),
			/*2*/ videoDataLog.viewCount,
			/*3*/ (videoData.viewCount == undefined || isNaN(videoData.viewCount) || videoData.viewCount < 1) ? -100 : videoData.viewCount*1,
			/*4*/ (videoData.viewCount == undefined || isNaN(videoData.viewCount) || videoData.viewCount < 1) ? -100 : Math.exp(videoData.viewCount/1e10),
			/*5*/ videoDataLog.videoAge,
			/*6*/ Math.exp(videoDataLog.videoAge),
			/*7*/ videoDataLog.duration,
			/*8*/ Math.exp(videoDataLog.duration),
			/*9*/ videoDataLog.subscriberCount,
			/*10*/ Math.exp(videoDataLog.subscriberCount),
			/*11*/ videoDataLog.subscriberViewCountRatio,
			/*12*/ videoDataLog.subscriberViewCountRatio2,
			/*13*/ Math.exp(videoDataLog.subscriberViewCountRatio2)
		],
		"averageLikesToViewsRatio": videoData.likeCount *1.0 / (Math.exp(videoDataLog.viewCount) < 1 ? 1 : Math.exp(videoDataLog.viewCount)),
		"varianceLikesToViewsRatio": 0,
		"averageViews": Math.exp(videoDataLog.viewCount) < 1 ? 1 : Math.exp(videoDataLog.viewCount),
		"averageDistance": 0,
		"varianceDistance": 0,
		"count": 1,
		"age": 0,
		"countAgeRatio": 0,
		"meanSquaredDifferenceDistance": 0,
		"meanSquaredDifferenceLikesToViewsRatio": 0
	};
	return datapoint;
}
	

async function main(videoId, isThumbnail=false) {
	let videoData = await getVideoInfo(videoId);
	if (videoData.likeCount == undefined || videoData == null) {
		return null;
	}
	let datapoint = await initializeDatapoint(videoData);
	let coordinatesStats = await getCoordinatesStats(datapoint);
	let normalizedCoordinates = normalizeCoordinates(datapoint, coordinatesStats);
	coordinatesStats = updateAndSaveCoordinateStats(coordinatesStats, datapoint, normalizedCoordinates);	
	datapoint.coordinates = normalizedCoordinates;
	let centroids = await getCentroids(datapoint);
	let centroid = sequentialKMeans(centroids, datapoint, coordinatesStats.correlationMatrix);
	let videoScore = calculateScore(centroid, datapoint);

	if (!isThumbnail) {
		let liksEl = document.querySelector("ytd-menu-renderer yt-formatted-string[aria-label]");
		let span = liksEl.querySelector('span');
		if (!span) {
			span = document.createElement('span');
			span.style['padding'] = '0 0.6em';
			liksEl.prepend(span);
		}
		let videoScorePercentage = (videoScore * 100).toFixed(2);
		span.innerHTML = `<span>${videoScorePercentage}%</span>`;
	} else {
		return videoScore;
	}
}

function getVideoId() {
  const urlObject = new URL(window.location.href);
  const pathname = urlObject.pathname;
  if (pathname.startsWith("/clip")) {
    return document.querySelector("meta[itemprop='videoId']").content;
  } else {
    if (pathname.startsWith("/shorts")) {
      return pathname.slice(8);
    }
    return urlObject.searchParams.get("v");
  }
}

function isVideoLoaded() {
  if (isMobile) {
    return document.getElementById("player").getAttribute("loading") == "false";
  }
  const videoId = getVideoId();
  return (
    document.querySelector(`ytd-watch-flexy[video-id='${videoId}']`) !== null
  );
}

async function waitForVideoToLoad(event) {
	let loadTimer;
	function checkForVideoLoad(check) {
		if (isShorts() || isVideoLoaded()) {
			clearInterval(loadTimer);
			let videoId = getVideoId();
			main(videoId);
    	} else {
			clog("Video loading...");
		}
	}
	loadTimer = setInterval(checkForVideoLoad, 111);
}

// #region Start here
(async function() {
	try {
		if (isShorts() || isNormalVideo()) {
			window.addEventListener("yt-navigate-finish", waitForVideoToLoad, true);
		}
	} catch (err) {
		clog(err);
	}
})();
// #endregion

// #region Thumbnail Scores Button
chrome.runtime.onMessage.addListener(gotMessage);
async function gotMessage(message, sender, sendResponse) {
	if (message.txt == "getScores") {
		getThumbnailScores();
	}
}

async function getThumbnailScores() {
	let thumbnails = document.querySelectorAll("ytd-thumbnail");
	for (let i = 0; i < thumbnails.length; i++) {
		let thumbnail = thumbnails[i];
		let a = thumbnail.querySelector("a");
		let href = a.getAttribute("href");
		if (href != null) {
			let videoId
			if (href.includes("/shorts/")) {
				videoId = href.split("/shorts/")[1].split("/")[0];
			} else {
				videoId = href.split("=")[1];
			}
			if (clogVideoIds) {
				clog("videoId: ", videoId);
			}
			let score = await main(videoId, true);
			score = (score * 100).toFixed(2);
			let div = document.createElement('div');
			div.style['position'] = 'absolute';
			div.style['top'] = '0';
			div.style['left'] = '0';
			div.style['background-color'] = '#fff';
			div.style['color'] = '#000';
			div.style['font-size'] = '12px';
			div.style['padding'] = '0.2em 0.4em';
			div.style['border-radius'] = '0.2em';
			div.style['font-weight'] = 'bold';
			div.classList.add("scoreExtension");
			div.innerHTML = `<span>${score}%</span>`;
			let scoreColor = (score - 40) / (60) * 255;
			let lightDark = (score - 50)/50 * 255 * 0.4 -10;
			let red = Math.abs(scoreColor-255) + lightDark;
			let blue = score > 95 ? (score - 97)/3 *255 + lightDark : lightDark;
			let green = 255 - red + lightDark;
			red = red > 255 ? 255 : red;
			green = green > 255 ? 255 : green;
			blue = blue > 255 ? 255 : blue;
			let color = `rgb(${red}, ${green}, ${blue})`;
			div.style['color'] = color;
			thumbnail.append(div);
		}
	}
}
// #endregion