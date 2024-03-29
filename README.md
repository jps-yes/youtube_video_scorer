# YouTube Video Scorer

**A chrome extension that scores YouTube videos. It is a useful metric since dislikes and like-to-dislike ratio were removed from YouTube.**

**[Download it from Chrome Web Store](https://chrome.google.com/webstore/detail/youtube-video-scorer/gnhpjpbjmobcockboghiffjmmnddmbbg)**

## How to use

1. Install the extension.
2. Get an YouTube API key from [Google](https://console.developers.google.com/apis/credentials). A free key allows you to score 10 000 videos per day.
3. Insert the API key in the extension popup.
4. Navigate to a YouTube video. The extension will score the video and display the score.
5. Click on the button in the extension popup to see the scores of multiple videos on the thumbnails. 

## Technical Details

**It works the following way:**
1. Gets video statistics using the YouTube API.
2. Clusters video into groups based on video characteristics. 
    * Clustering is done using [K-means](https://en.wikipedia.org/wiki/K-means_clustering).
    * Parameters used are combinations and transformations of views, video age, video length, number of comments, number of channel subscribers.
3. Scores the video relative to the other videos in the cluster.
    * The score is the percentile of likes-to-view ratio of the video relative to the other videos in the cluster.
    * A transformation of the percentile to make the score more intuitive.

**How it uses new video data:**
* Centroids for clustering and statistics are pre-deployed.
* New video data is used to update the centroids and statistics locally on the browser.
* No data is collected or sent outside the browser.