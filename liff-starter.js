window.onload = function (e) {
    liff.init(function (data) {
        initializeApp(data);
    });
};

function initializeApp(data) {
    document.getElementById('languagefield').textContent = data.language;
    document.getElementById('viewtypefield').textContent = data.context.viewType;
    document.getElementById('useridfield').textContent = data.context.userId;
    document.getElementById('utouidfield').textContent = data.context.utouId;
    document.getElementById('roomidfield').textContent = data.context.roomId;
    document.getElementById('groupidfield').textContent = data.context.groupId;

    document.getElementById('pushdata').addEventListener('click',function()
    {
        testoutput();
    })
  
    // openWindow call
    document.getElementById('openwindowbutton').addEventListener('click', function () {
        liff.openWindow({
            url: 'https://line.me'
        });
    });

    // closeWindow call
    document.getElementById('closewindowbutton').addEventListener('click', function () {
        liff.closeWindow();
    });

    // sendMessages call
    document.getElementById('sendmessagebutton').addEventListener('click', function () {
        liff.sendMessages([{
            type: 'text',
            text: "You've successfully sent a message! Hooray!"
        }, {
            type: 'sticker',
            packageId: '2',
            stickerId: '144'
        }]).then(function () {
            window.alert("Message sent");
        }).catch(function (error) {
            window.alert("Error sending message: " + error);
        });
    });

    //get profile call
    document.getElementById('getprofilebutton').addEventListener('click', function () {
        liff.getProfile().then(function (profile) {
            document.getElementById('useridprofilefield').textContent = profile.userId;
            document.getElementById('displaynamefield').textContent = profile.displayName;

            var profilePictureDiv = document.getElementById('profilepicturediv');
            if (profilePictureDiv.firstElementChild) {
                profilePictureDiv.removeChild(profilePictureDiv.firstElementChild);
            }
            var img = document.createElement('img');
            img.src = profile.pictureUrl;
            img.alt = "Profile Picture";
            profilePictureDiv.appendChild(img);

            document.getElementById('statusmessagefield').textContent = profile.statusMessage;
            toggleProfileData();
        }).catch(function (error) {
            window.alert("Error getting profile: " + error);
        });
    });

    document.getElementById('pushtemplate').addEventListener('click',function()
    {
        liff.getProfile().then(function (profile) {
            var template = {
                platformid :'1597689956',
                platformtype :'PlatformLINE',
                community_id : profile.userId,
                content:null,
                message_type:'TemplateMessage',
                attachmentid:null,
                payload:
                [{
                    temp_title:'訂位成功',
                    temp_text:'1位大人，1個兒童椅，1個輪椅 王先生 電話 +886923456789',
                    temp_url:'https://ocard.co/resv/ocard?f=messenger&i=5ba37004db302e79468cebc4&a=2',
                    temp_imgurl:'https://png.pngtree.com/element_origin_min_pic/17/01/03/7e8d113912e9e790520c5c3c1d0509e1.jpg',
                    temp_buttons:
                        [{
                            btn_type:'postback',
                            btn_label:'取消訂位',
                            btn_postback:'取消訂位'
                        }]}
                ]};

            // var http = new XMLHttpRequest();
            // var url = 'https://chatbot.iqs-t.com:4443/api/publish';
            // http.open('POST',url,true);
            // http.setRequestHeader('Content-type', 'application/json');
            // http.setRequestHeader('Channel-Authorization', 'nvOcQMfERrASHCIuE797');
            // http.send(JSON.parse(template));

            document.getElementById('h1').textContent= JSON.parse(template);

        }).catch(function (error) {
            window.alert("Error getting profile: " + error);
        });
    });
}

function toggleProfileData() {
    var elem = document.getElementById('profileinfo');
    if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
        elem.style.display = "none";
    } else {
        elem.style.display = "block";
    }
}

function testoutput(){
    var template = {
        platformid : '1597689956',
        platformtype :'PlatformLINE',
        community_id :'Ufe20993e07630bb689e83eaad08a1694',
        content:null,
        message_type:'TemplateMessage',
        attachmentid:null,
        payload:
        [
            {
                temp_title:'訂位成功',
                temp_text:'1位大人，1個兒童椅，1個輪椅 王先生 電話 +886923456789',
                temp_url:'https://ocard.co/resv/ocard?f=messenger&i=5ba37004db302e79468cebc4&a=2',
                temp_imgurl:'https://png.pngtree.com/element_origin_min_pic/17/01/03/7e8d113912e9e790520c5c3c1d0509e1.jpg',
                temp_buttons:
                    [{
                        btn_type:'postback',
                        btn_label:'取消訂位',
                        btn_postback:'取消訂位'
                    }]
            }
        ]};
    
        document.getElementById('test').textContent = JSON.parse(template);
        document.getElementById('h1').textContent = JSON.parse(template);
   

}