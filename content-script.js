let API_KEY = "";
chrome.storage.local.get('apiKey', function(result) {
	if (result.apiKey) {
		API_KEY = result.apiKey;
		//exportObjectToLocalFolder({"apyKey": API_KEY}, "apiKey") // EXPORT
	}
});


let isMobile = location.hostname == "m.youtube.com";
let isShorts = () => location.pathname.startsWith("/shorts");
let isNormalVideo = () => location.pathname.startsWith("/watch");

async function getVideoInfo(videoId) {
	const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=statistics,contentDetails,snippet`;	
	const response = await fetch(url);
	const data = await response.json();
	let commentCount = data.items[0].statistics.commentCount;
	let viewCount = data.items[0].statistics.viewCount ? data.items[0].statistics.viewCount : -100;
	let likeCount = data.items[0].statistics.likeCount;
	let publishedAt = data.items[0].snippet.publishedAt;
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

async function getCentroids(datapoint) {
	datapointDeepCopy = JSON.parse(JSON.stringify(datapoint));
	
	let centroids = await new Promise((resolve, reject) => {
		chrome.storage.local.get('centroids', function(data) {
			if (data.centroids) {
				resolve(data.centroids);
				console.log(data.centroids)
			} else { // if no centroids are stored
				let backup = [{"age":3633,"averageDistance":0.17631643281328926,"averageLikesToViewsRatio":0.07541323738686924,"averageViews":94575.53684210534,"coordinates":[0.347891716040732,-0.16359497823606317,0.09612283245087465,-0.138948503041255,0.059451060768527325,-0.02288195065141804,-0.2807942912663878,0.15190171918361908,-0.2527602208255673,0.0824686944014844,-0.3188788826148238,-0.10779365455923903,-0.7563420341392268,-0.1549277289767489],"count":285,"countAgeRatio":0.07844756399669695,"varianceDistance":0.007263609123509129,"varianceLikesToViewsRatio":0.0022520691816246452},{"age":3630,"averageDistance":0.45792792644710933,"averageLikesToViewsRatio":0.051842319328874065,"averageViews":1389736.8242971885,"coordinates":[0.1873065080900245,-0.037318196331849095,0.24027008790749796,-0.04171601137136675,0.08043992593552134,0.39102347501716683,-0.1742631761143996,0.13803680939981042,-0.040024443777296505,0.0989027371539926,-0.05495943170252246,-0.087969425890337,-1.5153265335052486,-0.09004334339288342],"count":996,"countAgeRatio":0.2743801652892562,"varianceDistance":0.0988583918176589,"varianceLikesToViewsRatio":0.0015960511693278744},{"age":3626,"averageDistance":0.6650987024178471,"averageLikesToViewsRatio":0.052225467501255465,"averageViews":2580889.6989795906,"coordinates":[0.17898595159399344,-0.013075601667330385,0.2538661046457574,-0.0022203116929255416,0.2054399410321736,0.29671166732578824,-0.10216267531426163,0.13077316363473887,0.273798258543118,0.2029280434836787,-0.1263052497406774,-0.008391502064218728,-2.481220145086733,-0.019673098903281224],"count":784,"countAgeRatio":0.21621621621621623,"varianceDistance":0.3664504661227741,"varianceLikesToViewsRatio":0.001474716851965856},{"age":2413,"averageDistance":0.4907822617975332,"averageLikesToViewsRatio":0.07016411550519418,"averageViews":6158351.170212763,"coordinates":[0.3700540710928767,-0.005113366674366856,0.5253350036154061,0.3972198571051644,0.06201446973947313,0.9111484491280752,-0.14342882896753542,0.1768907475078047,0.006851376795646379,0.672058975065074,4.182622452459295,-0.10450357438950814,-1.6007301334779787,-0.09583567070290784],"count":188,"countAgeRatio":0.07791131371736428,"varianceDistance":0.11690943202703971,"varianceLikesToViewsRatio":0.0005312957081957799},{"age":1969,"averageDistance":0.48604346205372684,"averageLikesToViewsRatio":0.04201647538200182,"averageViews":33000613.35057473,"coordinates":[-0.11623961479135411,0.28906070606413964,0.7132247452567267,1.685444275123942,0.05878355057270851,1.395287532601792,1.2290834314885433,0.12557734614838623,-0.15565371591324717,0.6391027643420454,2.3162342475075115,-0.11471724164767803,-1.3582793467763965,-0.09119561783083079],"count":174,"countAgeRatio":0.08836973082783138,"varianceDistance":0.08789348303055242,"varianceLikesToViewsRatio":0.000811525868306316},{"age":1951,"averageDistance":0.9378426051179873,"averageLikesToViewsRatio":0.02058087789869941,"averageViews":11216042.244094497,"coordinates":[0.12267920649074741,0.04500989062053968,0.10558780767528032,0.4643570436013372,0.05586923090984464,0.8879032809164038,0.10401725095595937,-4.626311375876793,-0.41647543690401756,-0.07648747702243162,-0.3618784282566841,0.005086907633304864,-0.5691941699067525,-0.07294551390553837],"count":127,"countAgeRatio":0.06509482316760636,"varianceDistance":0.7070929572350726,"varianceLikesToViewsRatio":0.00013164273673164445},{"age":1507,"averageDistance":0.31879045323914873,"averageLikesToViewsRatio":0.036891906058802305,"averageViews":2026237.1062801946,"coordinates":[0.22446221955747675,-0.07020470976236644,0.0654838897381458,-0.19765079912828537,0.06493322814567754,0.4456998144207417,0.003953025721848784,0.2589022036349738,0.022387396330952665,-0.14750296566560392,-0.4484850457756068,0.0019359216065700626,-0.26839581406086926,0.009416931517006554],"count":207,"countAgeRatio":0.13735899137358992,"varianceDistance":0.015346703223463444,"varianceLikesToViewsRatio":0.0005358952751384771},{"age":1345,"averageDistance":0.6667407667995805,"averageLikesToViewsRatio":0.01648489004046814,"averageViews":4303218.458333331,"coordinates":[-2.091161417841966,-0.07655349858691253,0.12844975159185104,-0.0572856137419293,0.19463564425303465,0.2945702935789709,0.17944324793291214,0.24913699811757317,0.18767894184472728,-0.028137079295937287,-0.4006477388815958,0.322583698365064,-0.13892986189899528,0.33942978971145316],"count":72,"countAgeRatio":0.053531598513011154,"varianceDistance":0.058283378671533104,"varianceLikesToViewsRatio":0.00043948239723235047},{"age":1196,"averageDistance":0.3996294807186297,"averageLikesToViewsRatio":2.2471381248824938,"averageViews":571913.7435897439,"coordinates":[0.33274830362124547,-0.06737767500059882,0.19978048827150438,-0.2340979441726497,0.22468821052685856,0.4690661185018534,-0.2259945398785642,0.260171745899741,0.46522604562073905,0.23177238698239408,-0.3959131419036181,-0.09653221766406966,-4.793867904873655,-0.0822757254156218],"count":234,"countAgeRatio":0.1956521739130435,"varianceDistance":0.04668203413144123,"varianceLikesToViewsRatio":1129.860795848608},{"age":1023,"averageDistance":1.9474930546995566,"averageLikesToViewsRatio":1313.4347688980574,"averageViews":28238.868421052648,"coordinates":[-2.071999066595349,-0.07723805728776181,-4.642745031147837,-0.30219537733983065,-4.824172525466364,0.8454324950129397,0.6847306361442138,0.34316024169324794,2.0836005466591017,-4.432103033996216,-0.4368235738368616,-12.187413518353038,-5.5121905956685895,-0.08444293106863376],"count":76,"countAgeRatio":0.07429130009775171,"varianceDistance":1.3955539786563051,"varianceLikesToViewsRatio":14388851.357858283},{"age":1018,"averageDistance":3.1538416817534976,"averageLikesToViewsRatio":543.8823529411764,"averageViews":1,"coordinates":[-2.314631305400081,-0.0782473865197214,-6.0638305175386105,-0.30676096184732626,-6.340391141636203,0.7947553837533436,0.3721624678619407,0.34812823203021004,2.193318000730422,-5.386479337243044,-0.4412842901267251,-34.47143115540015,-6.7404315433790405,-0.09526578210169413],"count":68,"countAgeRatio":0.06679764243614932,"varianceDistance":1.591231868394122,"varianceLikesToViewsRatio":1563087.8979238765},{"age":806,"averageDistance":1.3829559737552783,"averageLikesToViewsRatio":151.8608479560004,"averageViews":28089712.78,"coordinates":[-1.079353898509349,-0.07004958809654413,-0.022309253022132984,1.2726610566037517,-0.05377592925007746,0.44721965026138144,-0.026227536612197323,0.2974870238410754,1.374222381563957,-0.36221261558771806,-0.3662575670399161,1.0201013117832982,-1.9051376805178522,0.0328344976567003],"count":50,"countAgeRatio":0.062034739454094295,"varianceDistance":0.2846067904723582,"varianceLikesToViewsRatio":311704.08380640036},{"age":673,"averageDistance":0.7025301405653012,"averageLikesToViewsRatio":0.07139338788291492,"averageViews":304267.2249999999,"coordinates":[0.38044093084421066,-0.07027577580401966,0.246444543129775,-0.24791164117330305,0.2688491662404435,-0.11153502553183176,-0.5239968610456825,0.17779510280732658,0.0945320729310829,0.26988219599430885,-0.408993021344768,0.11063230711304287,-9.962695267582562,-0.09385022850559807],"count":40,"countAgeRatio":0.05943536404160475,"varianceDistance":0.12900879185942207,"varianceLikesToViewsRatio":0.001161127456627858}];
				resolve(backup);
			}
		});
	});
	if (centroids.length == 0) {
		centroids.push(datapointDeepCopy);
	} 
	return centroids;
}

function removeCorruptedCentroids(centroids) {
	centroids.forEach(function (centroid) {	
		for(let key in centroid) {
			if (Array.isArray(centroid[key])) {
				if (centroid[key].includes(NaN) || centroid[key].includes(undefined) || centroid[key].includes(null)) {
					console.log("Corrupted centroid found");
					console.log(key, centroid[key]);
					centroids.splice(centroids.indexOf(centroid), 1);
				}
			} else {
				if (isNaN(centroid[key]	) || centroid[key] == undefined || centroid[key] == null) {
					console.log("Corrupted centroid found");
					console.log(key, centroid[key]);
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
				console.log("Obsolete centroid found");
			} else if (percentile <= 0.20 && centroid.count <= 10) {
				centroids.splice(centroids.indexOf(centroid), 1);
				console.log("Obsolete centroid found");
			} else if (percentile <= 0.13 && centroid.count <= 30) {
				centroids.splice(centroids.indexOf(centroid), 1);
				console.log("Obsolete centroid found");
			} else if (percentile <= 0.08 && centroid.count <= 100) {
				centroids.splice(centroids.indexOf(centroid), 1);
				console.log("Obsolete centroid found");
			} else if (percentile <= 0.05) {
				centroids.splice(centroids.indexOf(centroid), 1);
				console.log("Obsolete centroid found");
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
					console.log("Error saving centroids to chrome storage");
				}
			}
			});
		} else {
			console.log("Centroids saved to chrome storage");
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
		for (let j = 0; j < covarianceMatrix[i].length; j++) {
			if (i != j) {
				distanceWeights[i] += Math.abs(covarianceMatrix[i][j]);
			}
		}	
		distanceWeights[i] =  distanceWeights[i] / (numberOfCoordinates - 1);
		distanceWeights[i] =  1/numberOfCoordinates + (1-distanceWeights[i])*(numberOfCoordinates-1)/numberOfCoordinates;
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
	centroids.forEach(function(centroid) {
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
		console.log("Min distance is greater than threshold");
		console.log("Creating new centroid");
		centroids.push(datapoint);
		index = centroids.length - 1;
	} else { 
		console.log("Datapoint clustered to centroid with index ", index);
		centroids[index] = updateCentroid(centroids[index], datapoint, minDistance);
	}
	let centroidsCopy = JSON.parse(JSON.stringify(centroids));
	saveCentroids(centroidsCopy);
	return centroids[index];
}

function updateCentroid(centroid, datapoint, distance) {
	centroid.count += 1;
	let coordinates = centroid.coordinates;
	let newCoordinates = [];
	for (let i = 0; i < coordinates.length; i++) {
		newCoordinates.push(movingAverage(coordinates[i], datapoint.coordinates[i], centroid.count));
	}
	centroid.coordinates = newCoordinates;
	let averageDistance = movingAverage(centroid.averageDistance, distance, centroid.count);
	let varianceDistance = movingVariance(centroid.varianceDistance, distance, centroid.averageDistance, averageDistance, centroid.count);
	centroid.averageDistance = averageDistance;
	centroid.varianceDistance = varianceDistance;
	let averageLikesToViewsRatio = movingAverage(centroid.averageLikesToViewsRatio, datapoint.averageLikesToViewsRatio, centroid.count);
	let varianceLikesToViewsRatio = movingVariance(centroid.varianceLikesToViewsRatio, datapoint.averageLikesToViewsRatio, centroid.averageLikesToViewsRatio, averageLikesToViewsRatio, centroid.count);
	centroid.averageLikesToViewsRatio = averageLikesToViewsRatio;
	centroid.varianceLikesToViewsRatio = varianceLikesToViewsRatio;
	let averageViews = movingAverage(centroid.averageViews, datapoint.averageViews, centroid.count);
	centroid.averageViews = averageViews;
	
	return centroid;
}

function movingAverage(oldAverage, newPoint, count) {
	let newAverage = oldAverage + (newPoint - oldAverage) / count;
	return newAverage;
}

function movingVariance(oldVariance, newPoint, oldAverage, newAverage, count) {
	let newVariance = oldVariance + ((newPoint - oldAverage)*(newPoint - newAverage)-oldVariance)/count;
	return newVariance;
}

function movingAverageAndVariance(count, average, meanSquaredDifference, newValue) {
	let stats = {
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
	let adjSigma = sigma * datapoint.averageViews / (datapoint.averageViews + centroid.averageViews);
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
	score = score < 0 ? 0 : score;
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

async function getCoordinatesStats(datapoint) {
	let coordinatesStats = await new Promise((resolve, reject) => {
		chrome.storage.local.get(['coordinatesStats'], function(result) {
			if (result.coordinatesStats) {
				resolve(result.coordinatesStats);
			} else { 
				let coordinatesStats = {"average":[-4.564502073518017,13973.27002477289,5.8657508363224,4572296.066336351,-4.587484639517264,22.298901936575657,54085334807.086655,2.2691805180941746,1825.081750619327,6.184560291126199,12645657.75667496,4.630002412840746,-2.615825707087112,0.00010027214065326205],"correlationMatrix":[[1,0.03679860182811505,0.5140550830753973,-0.035731995150444916,0.4936764950801019,0.020706397274355002,-0.08483026015300064,0.055758124113147664,-0.21828219146383762,0.4861329461765736,0.07623701132530472,-0.183094237949183,-0.1623536244012007,-0.06481296614685116],[0.03679860182811505,1,0.03149706364122274,0.3719069515316645,0.01671228585590957,0.05777162376594212,0.1050798131180243,0.009858670915640815,-0.029584617462793783,0.0271208843491143,0.10859135145792052,-0.0047973401090050365,0.030563523421272415,-0.005900481992827227],[0.5140550830753973,0.03149706364122274,1,0.10516519072567868,0.987904262441453,-0.05347638084189247,-0.06532755645415506,-0.01424150681087852,-0.4153426140782202,0.8974247605209844,0.14662014349806757,0.03376529969888145,-0.10033403647706747,0.009011692840062329],[-0.035731995150444916,0.3719069515316645,0.10516519072567868,0.9999999999999998,0.057459908812112125,0.20528735021973618,0.2099550845228366,0.037467943699199445,-0.055197336903275725,0.08692503809353898,0.3295206049887986,0.15325107074145475,0.11047259759455691,-0.019682633554104413],[0.4936764950801019,0.01671228585590957,0.987904262441453,0.057459908812112125,1,-0.13413625548047495,-0.10681518458160873,-0.020009199155954147,-0.4197441191679431,0.8990382076708935,0.09131253527521718,0.02308479610114834,-0.11646059987067929,0.021126923479780263],[0.020706397274355002,0.05777162376594212,-0.05347638084189247,0.20528735021973618,-0.13413625548047495,1,0.595211445495771,-0.040335329989971094,0.11614979513914896,-0.1310901811749292,0.23040262063102082,0.0701295920605509,-0.1329770657343916,-0.0020051962239495576],[-0.08483026015300064,0.1050798131180243,-0.06532755645415506,0.2099550845228366,-0.10681518458160873,0.595211445495771,1,0.005571587314134885,-0.03998677813253004,-0.1163657920288548,0.1651834489569635,0.05702136587998147,0.15835919417618846,0.03383711018371134],[0.055758124113147664,0.009858670915640815,-0.01424150681087852,0.037467943699199445,-0.020009199155954147,-0.040335329989971094,0.005571587314134885,0.9999999999999999,0.18680279630653168,-0.05843449453326066,0.07648589439331593,0.02151026168002955,-0.103970737992472,0.01270873967866955],[-0.21828219146383762,-0.029584617462793783,-0.4153426140782202,-0.055197336903275725,-0.4197441191679431,0.11614979513914896,-0.03998677813253004,0.18680279630653168,0.9999999999999999,-0.42138960056659563,-0.10087053981456266,0.03806130027480783,-0.16430492572155625,-0.022845797315136456],[0.4861329461765736,0.0271208843491143,0.8974247605209844,0.08692503809353898,0.8990382076708935,-0.1310901811749292,-0.1163657920288548,-0.05843449453326066,-0.42138960056659563,1,0.16687135222719254,0.011119282207237674,-0.12000191112021623,-0.006867637857835075],[0.07623701132530472,0.10859135145792052,0.14662014349806757,0.3295206049887986,0.09131253527521718,0.23040262063102082,0.1651834489569635,0.07648589439331593,-0.10087053981456266,0.16687135222719254,0.9999999999999999,-0.0342488953629481,0.17503471595788583,-0.03294508094482028],[-0.183094237949183,-0.0047973401090050365,0.03376529969888145,0.15325107074145475,0.02308479610114834,0.0701295920605509,0.05702136587998147,0.02151026168002955,0.03806130027480783,0.011119282207237674,-0.0342488953629481,1,0.0366739877298633,0.012313987985826792],[-0.1623536244012007,0.030563523421272415,-0.10033403647706747,0.11047259759455691,-0.11646059987067929,-0.1329770657343916,0.15835919417618846,-0.103970737992472,-0.16430492572155625,-0.12000191112021623,0.17503471595788583,0.0366739877298633,1,0.040215703807131374],[-0.06481296614685116,-0.005900481992827227,0.009011692840062329,-0.019682633554104413,0.021126923479780263,-0.0020051962239495576,0.03383711018371134,0.01270873967866955,-0.022845797315136456,-0.006867637857835075,-0.03294508094482028,0.012313987985826792,0.040215703807131374,1]],"count":3634,"covarianceSum":[[3895086.2908040276,886236465.195863,1585879.7808642546,-81976385421.87129,1356187.4501599923,8029.984463145959,-971345954206145.6,136387.44158447275,-74665764.39088547,1575661.0092389449,303862484126.93866,-1095269.7384152054,-104971.34221231367,-8.854937929161288],[886236465.195863,148867703227367.25,600720391.6915557,5274818213760853,283827733.3062139,138505315.02636814,7438478820573664000,149082374.34054205,-62562035548.197365,543442103.0766885,2675766189705240.5,-177414300.3093415,122166992.73872763,-4983.710603995332],[1585879.7808642546,600720391.6915557,2442791.549318567,191068095743.50137,2149199.8082014816,-16423.164128815337,-592385218751924.2,-27587.149804501078,-112510839.4456655,2303511.8131006197,462795922982.2577,159956.4227644922,-51373.80219560678,0.9750225663011068],[-81976385421.87129,5274818213760853,191068095743.50137,1350930538257100500,92960868270.904,46884611293.293755,1.4158182337689396e+21,53973931731.59328,-11119347503446.69,165924527953.53836,773484767794756700,539893248969.95905,42065038992.03609,-1583670.397618539],[1356187.4501599923,283827733.3062139,2149199.8082014816,92960868270.904,1936978.810549966,-36682.610507786405,-862501830128855.9,-34514.36031387814,-101249228.73295258,2054895.6621108942,256652509842.49564,97381.4748413751,-53099.65238529763,2.035465644332034],[8029.984463145959,138505315.02636814,-16423.164128815337,46884611293.293755,-36682.610507786405,38603.68246172609,678500600193901.4,-9822.175019837741,3955282.284060399,-42299.35279946228,91422788052.78928,41764.140656758085,-8559.3607962614,-0.027273214471712298],[-971345954206145.6,7438478820573664000,-592385218751924.2,1.4158182337689396e+21,-862501830128855.9,678500600193901.4,3.365223622333756e+25,40058399379613.16,-40203887215516300,-1108616876895960.9,1.9352014191587314e+21,1002610965833377.9,300954241113186.3,13588305809.685265],[136387.44158447275,149082374.34054205,-27587.149804501078,53973931731.59328,-34514.36031387814,-9822.175019837741,40058399379613.16,1535680.9740846988,40121627.6831735,-118923.85673395854,191418774321.26538,80794.92188904979,-42209.65950637161,1.090229848407784],[-74665764.39088547,-62562035548.197365,-112510839.4456655,-11119347503446.69,-101249228.73295258,3955282.284060399,-40203887215516300,40121627.6831735,30032240448.720093,-119929734.2129001,-35302941324690.72,19992419.53909457,-9328131.718547765,-274.07237798681865],[1575661.0092389449,543442103.0766885,2303511.8131006197,165924527953.53836,2054895.6621108942,-42299.35279946228,-1108616876895960.9,-118923.85673395854,-119929734.2129001,2696365.851025016,553380528815.2584,55341.89571748417,-64554.68882480384,-0.7806599104233326],[303862484126.93866,2675766189705240.5,462795922982.2577,773484767794756700,256652509842.49564,91422788052.78928,1.9352014191587314e+21,191418774321.26538,-35302941324690.72,553380528815.2584,4077582939058056700,-209621507632.8444,115791269705.47313,-4605290.843765775],[-1095269.7384152054,-177414300.3093415,159956.4227644922,539893248969.95905,97381.4748413751,41764.140656758085,1002610965833377.9,80794.92188904979,19992419.53909457,55341.89571748417,-209621507632.8444,9184575.150266137,36411.443095748975,2.5834100445493147],[-104971.34221231367,122166992.73872763,-51373.80219560678,42065038992.03609,-53099.65238529763,-8559.3607962614,300954241113186.3,-42209.65950637161,-9328131.718547765,-64554.68882480384,115791269705.47313,36411.443095748975,107311.91251390103,0.9119787592520764],[-8.854937929161288,-4983.710603995332,0.9750225663011068,-1583670.397618539,2.035465644332034,-0.027273214471712298,13588305809.685265,1.090229848407784,-274.07237798681865,-0.7806599104233326,-4605290.843765775,2.5834100445493147,0.9119787592520764,0.004792144697722801]],"meanSquaredDifference":[3895086.2908040276,148867703227367.25,2442791.549318567,1350930538257100500,1936978.810549966,38603.68246172609,3.365223622333756e+25,1535680.9740846988,30032240448.720093,2696365.851025016,4077582939058056700,9184575.150266137,107311.91251390103,0.004792144697722801],"variance":[1072.4356527544128,40987803752.02843,672.5747657815438,371952240709554.1,533.3091438738893,10.62876719761181,9.26548354166783e+21,422.81965145503824,8268788.6698017875,742.3914788064471,1122682527273694,2528.7927175842888,29.546231419025613,0.0000013194230995932823]};
				resolve(coordinatesStats);
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
	//exportObjectToLocalFolder(coordinatesStats, "coordinatesStats"); // EXPORT TO LOCAL FOLDER
	return coordinatesStats;
}

async function main(videoId, isThumbnail=false) {
	let videoData = await getVideoInfo(videoId);
	if (videoData.likeCount == undefined || videoData == null) {
		return null;
	}
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
		"countAgeRatio": 0
	};
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
	console.log(document.querySelector("meta[itemprop='videoId']").content);
    return document.querySelector("meta[itemprop='videoId']").content;
  } else {
    if (pathname.startsWith("/shorts")) {
		console.log(pathname.slice(8));
      return pathname.slice(8);
    }
	console.log(urlObject.searchParams.get("v"));
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
			console.log("Video loading...");
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
		console.log(err);
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
			console.log("videoId: ", videoId);
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