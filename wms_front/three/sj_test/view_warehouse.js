import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js"

const shelf_info = [];

let wh_width = localStorage.getItem('wh_width')
let wh_length = localStorage.getItem('wh_length')
let wh_min_temp = localStorage.getItem('wh_min_temp')
let wh_max_temp = localStorage.getItem('wh_max_temp')
let wh_min_humid = localStorage.getItem('wh_min_humid')
let wh_max_humid = localStorage.getItem('wh_max_humid')
let shelf_num = localStorage.getItem('shelf_num')
let shelf_name = localStorage.getItem('shelf_name')
let shelf_x = localStorage.getItem('shelf_x')
let shelf_z = localStorage.getItem('shelf_z')
let shelf_width = localStorage.getItem('shelf_width')
let shelf_length = localStorage.getItem('shelf_length')
let shelf_floor = localStorage.getItem('shelf_floor')
let shelf_rotation = localStorage.getItem('shelf_rotation')
let st_shelf_num = localStorage.getItem('st_shelf_num')
let st_shelf_name = localStorage.getItem('st_shelf_name')
let st_shelf_x = localStorage.getItem('st_shelf_x')
let st_shelf_z = localStorage.getItem('st_shelf_z')
let st_shelf_rotation = localStorage.getItem('st_shelf_rotation')
let stock_num = localStorage.getItem('stock_num')
let stock_name = localStorage.getItem('stock_name')
let stock_info = localStorage.getItem('stock_info')
let input_date = localStorage.getItem('input_date')
let stock_floor = localStorage.getItem('stock_floor')
let stock_position = localStorage.getItem('stock_position')
let exp_dt = localStorage.getItem('exp_dt')

let wh_width_arr = wh_width.split(",").map(Number)
let wh_length_arr = wh_length.split(",").map(Number)
let wh_min_temp_arr = wh_min_temp.split(",").map(Number)
let wh_max_temp_arr = wh_max_temp.split(",").map(Number)
let wh_min_humid_arr = wh_min_humid.split(",").map(Number)
let wh_max_humid_arr = wh_max_humid.split(",").map(Number)
let shelf_num_arr = shelf_num.split(",").map(Number)
let shelf_name_arr = shelf_name.split(",")
let shelf_x_arr = shelf_x.split(",").map(Number)
let shelf_z_arr = shelf_z.split(",").map(Number)
let shelf_width_arr = shelf_width.split(",").map(Number)
let shelf_length_arr = shelf_length.split(",").map(Number)
let shelf_floor_arr = shelf_floor.split(",").map(Number)
let shelf_rotation_arr = shelf_rotation.split(",")
let st_shelf_num_arr = st_shelf_num.split(",").map(Number)
let st_shelf_name_arr = st_shelf_name.split(",")
let st_shelf_x_arr = st_shelf_x.split(",").map(Number)
let st_shelf_z_arr = st_shelf_z.split(",").map(Number)
let st_shelf_rotation_arr = st_shelf_rotation.split(",")
let stock_num_arr = stock_num.split(",").map(Number)
let stock_name_arr = stock_name.split(",")
let stock_info_arr = stock_info.split(",")
let input_date_arr = input_date.split(",")
let stock_floor_arr = stock_floor.split(",").map(Number)
let stock_position_arr = stock_position.split(",").map(Number)
let exp_dt_arr = exp_dt.split(",")

class App{
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;
        const renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;

        const object_arr = [];
        this._object_arr = object_arr;

        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();
        this._setupEvents();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }
     _setupControls(){
        new OrbitControls(this._camera, this._divContainer);
    }

    _setupEvents(){
        this._raycaster = new THREE.Raycaster();
        // _clickedPosition : 마우스로 클릭된 scene의 좌표를 참조
        this._raycaster._clickedPosition = new THREE.Vector2();
        // 클릭해서 선택된 매쉬 객체에 대한 참조
        this._raycaster._selectedMesh = null;

        // 마우스 클릭 이벤트
        window.addEventListener("dblclick",(event)=>{
            this._raycaster._clickedPosition.x = (event.clientX / window.innerWidth)*2-1;
            this._raycaster._clickedPosition.y = -(event.clientY / window.innerHeight)*2+1;
            this._raycaster.setFromCamera(this._raycaster._clickedPosition, this._camera);
            
            // 실제 클릭된 mesh를 얻는 코드
            const found = this._raycaster.intersectObjects(this._scene.children);
            if(found.length > 0){
                
                const clickedObj = found[0].object;

                let oldY = this._raycaster._clickedPosition.y;

                // 클릭한 재고 정보 띄우는 장치
                if(clickedObj.geometry.type=="BoxGeometry"){
                    // 해당 재고가 있는 선반의 위치 (.x .y .z로 구체적으로 알 수 있음)
                    // console.log(clickedObj.parent.position);
                    // 해당 선반에서 재고의 위치
                    console.log(clickedObj.position);
                    // 위의 두 값을 더할 때는 선반의 회전 여부도 알아둬야 할 듯
                    console.log(clickedObj.name);
                    // clickedObj.parent
                    // clickedObj.material.color.set(0xffff00);

                    oldY = clickedObj.position.y;
                }
                


                // // 재고 이동 on off
                // if(move_yn == true){
                    if(clickedObj.geometry.type=="BoxGeometry" && clickedObj.name!="shelf_ground"){
                        console.log(clickedObj);
                        // 빈자리가 아닌 재고가 있는 자리를 선택했을 때

                        //  이전에 클릭한 mesh를 저장한 변수
                        const oldSelectedMesh = this._raycaster._selectedMesh;
                        // 새로운 mesh를 담을 변수
                        this._raycaster._selectedMesh = clickedObj;

                        if(oldSelectedMesh !== this._raycaster._selectedMesh){
                            // 현재 선택된 재고에 선 추가
                            gsap.to(this._raycaster._selectedMesh.position,{y:7,duration:1})
                            // 동시에 선택된 재고를 제자리에서 회전
                            // gsap.to(this._raycaster._selectedMesh.rotation,{y:Math.PI*2,duration:1})
                        }else{
                            this._raycaster._selectedMesh = null;
                        }
                        if(oldSelectedMesh){
                            // 이전에 선택된 재고가 있다면
                            // 이전에 선택된 재고를 원래상태로 변경
                            
                            gsap.to(oldSelectedMesh.position,{y:oldY,duration:1});
                            
                        }
                    }else {
                        // 빈자리를 선택했을 때
                        if(this._raycaster._selectedMesh){
                            let i = 0
                            while(found[i].object.name !="shelf_ground"){
                                i++
                            }
                            console.log(found)
                            console.log(found[i].point);
                            // 선택된 재고를 클릭된 위치로 수평이동한 뒤 해당방향으로 수직이동
                            console.log(found[i])
                            const timeline = gsap.timeline();
                            timeline.to(this._raycaster._selectedMesh.position,{
                                x: Math.floor(found[i].point.x)+0.5,
                                z: Math.floor(found[i].point.z)+0.5,
                                duration:1,
                            })
                            timeline.to(this._raycaster._selectedMesh.position,{
                                y: found[i].point.y+0.4,
                                duration:1,
                            })
                            
                            // 동시에 회전
                            gsap.to(this._raycaster._selectedMesh.rotation,{y:-Math.PI*2,duration:1});
                            this._raycaster._selectedMesh = null;
                        }
                    }

                // }
            }else{
                // 아무것도 클릭되지 않았을 경우
                this._raycaster._selectedMesh = null;
            }
        
        
                
        }
    )
    

        // 반응형 웹
        window.onresize = this.resize.bind(this);
        this.resize();

        this._clock = new THREE.Clock();
        requestAnimationFrame(this.render.bind(this));




    }

    _setupCamera(){
        // three.js가 3차원 그래픽을 출력할 영역의 가로, 세로 크기를 가져오기
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        // 카메라 객체 생성
        const camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            100
        );

        camera.position.y = 10;
        camera.position.z = 10;
        this._camera = camera;
    }
    _setupLight(){
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color,intensity);
        light.position.set(-1, 2, 4);
        this._scene.add(light);
    }
    // 파란색 정육면체 mesh 생성
    _setupModel(){
        
        this._createBoard();
        
       


    }

    _createBoard(){

        const wareHouse = new THREE.Object3D();
        const planeGeometry = new THREE.PlaneGeometry(wh_width_arr[0],wh_length_arr[0],wh_width_arr[0],wh_length_arr[0])
    
        const wareHouseMaterial = new THREE.MeshPhongMaterial({
            emissive:0x888888, 
            flatShading:true,
            side : THREE.DoubleSide,
            visible:false
        })
        const group1 = new THREE.Group();
        const wareHouseMesh = new THREE.Mesh(planeGeometry,wareHouseMaterial);
         // 노란색 라인 생성
        const lineMaterial = new THREE.LineBasicMaterial({color: 0xa0a0a0});
        const line = new THREE.LineSegments(
         // WireframeGeometry : 모델의 외각선 표시
         new THREE.WireframeGeometry(planeGeometry),lineMaterial);
        
         group1.add(wareHouseMesh);
         group1.add(line);
         // 판 돌리기
        group1.rotation.x = -Math.PI/2;
 
 
         wareHouse.add(group1);
     
         const mesh = wareHouse
         mesh.position.set(0,0,0);
 
         this._scene.add(mesh);

         wareHouseMesh.name = 'ground'

         this._warehouse = wareHouse

        

         this._bringShelves();
         this._createShelf();
        this._bringStocks();

    }
    _bringStocks(){
        for(let i=0; i<stock_num_arr.length;i++){
            this._bringStock({shelf_name : st_shelf_name_arr[i], shelf_x : st_shelf_x_arr[i],shelf_z:st_shelf_z_arr[i],shelf_rotation : st_shelf_rotation_arr[i],stock_num:stock_num_arr[i],stock_name:stock_name_arr[i],stock_info:stock_info_arr[i],stock_floor:stock_floor_arr[i],stock_position: stock_position_arr[i],input_date:input_date_arr[i],exp_dt:exp_dt_arr[i]});
        }
    }
    _bringStock(i){

        let stock_x = 0;
        let stock_z = 0;

        if(i.shelf_rotation=="y"){
            stock_x = i.shelf_x + i.stock_position
            stock_z = i.shelf_z
        }else{
            stock_x = i.shelf_x
            stock_z = i.shelf_z + i.stock_position
        }

        const StockGeometry = new THREE.BoxGeometry(0.8,0.8,0.8)
        const StockMaterial = new THREE.MeshPhongMaterial({
            color : 0xffffff, emissive: 0x112244, flatShading:true
        })
        const StockMesh = new THREE.Mesh(StockGeometry, StockMaterial)
        StockMesh.position.set(stock_x,i.stock_floor-0.5,stock_z)
        StockMesh.name = {shelf_name:i.shelf_name,shelf_x:i.shelf_x,shelf_z:i.shelf_z,shelf_rotation:i.shelf_rotation,stock_num:i.stock_num,stock_name:i.stock_name,stock_info:i.stock_info,stock_position:i.stock_position,stock_floor:i.stock_floor,input_date:i.input_date,exp_dt:i.exp_dt}
        this._object_arr.push(StockMesh)
        this._scene.add(StockMesh)

    }

    _bringShelves(){

        for(let i=0; i<shelf_name_arr.length;i++){
            this._bringShelf({name:shelf_name_arr[i],x:shelf_x_arr[i],z:shelf_z_arr[i],width:shelf_width_arr[i],length:shelf_length_arr[i],floor:shelf_floor_arr[i],rotation:shelf_rotation_arr[i]})
        }
    }
    _bringShelf(item){
        const shelf_group = new THREE.Group();
        // 기본 바 설정
        const BarGeometry = new THREE.CylinderGeometry(0.03,0.03,item.floor-1+0.2)
        const BarMaterial = new THREE.MeshPhongMaterial({
            color : 0xffffff, emissive : 0x112244, flatShading:true
        })
        // 기본 판 설정
        const FloorGeometry = new THREE.BoxGeometry(item.width, 0.05,item.length)
        const FloorMaterial = new THREE.MeshPhongMaterial({
            color : 0xffffff, emissive : 0x112244, flatShading:true
        })
        for(let i=0;i<4;i++){
            // 바 생성
            const BarMesh = new THREE.Mesh(BarGeometry,BarMaterial)
            let x = 1;
            let z = 1;
            if(i==1){
                z=-1;
            }else if(i==2){
                x=-1;
                z=-1;
            }else if(i==3){
                x=-1;
            }
            BarMesh.position.x = item.width/2*x;
            BarMesh.position.y = 1/2*(item.floor-2)+(0.6);
            BarMesh.position.z = 1/2*z*item.length;
            shelf_group.add(BarMesh)
        }
        for(let i=0;i<item.floor;i++){
            // 판 생성
            const FloorMesh = new THREE.Mesh(FloorGeometry,FloorMaterial)
            FloorMesh.position.y = (i*1)+0.1;
            FloorMesh.name = "shelf_ground"
            shelf_group.add(FloorMesh);
        }
        if(item.rotation == "y"){
            shelf_group.rotation.y = -Math.PI/2;
        }
        shelf_group.position.set(item.x,0,item.z)
        shelf_group.name = item.name
        this._shelf = shelf_group;
        this._scene.add(shelf_group)
    }   

    _createShelf(){
  

        let rotation  = true;
        let send_rotation = "n"

         //=====================================================================
        // 하이라이트 모양과 위치 잡기 

        const highlightMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1,1),
            new THREE.MeshBasicMaterial({
                side : THREE.DoubleSide
            })
        )
        highlightMesh.position.set(0.5,0,0.5)
        highlightMesh.rotation.x = -Math.PI/2;


        console.log(this._object_arr)
        
        const mousePosition = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();

        let hover_camera = this._camera;
        let hover_scene = this._scene;
        
        
        let intersects;
        window.addEventListener('mousemove',function(e){
            mousePosition.x = (e.clientX / window.innerWidth)*2-1;
            mousePosition.y = -(e.clientY / window.innerHeight)*2+1;
            raycaster.setFromCamera(mousePosition, hover_camera);
            intersects = raycaster.intersectObjects(hover_scene.children)
            if(intersects.length >0){
                let i=0;
                intersects.forEach(function(intersect){
                    if(intersect.object.name==='shelf_ground'){
                        if(i==0){
                            const highlightPos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
                            const highlightY = new THREE.Vector3().copy(intersect.point).floor();
                            highlightMesh.position.set(highlightPos.x,highlightY.y+0.15,highlightPos.z)
                            
                            const objectExist = objects.find(function(object){
                                return(object.position.x === highlightMesh.position.x)
                                && (object.position.z === highlightMesh.position.z)
                                && (object.position.y-0.35 === highlightMesh.position.y)
                            })
                            if(!objectExist){
                                highlightMesh.material.color.setHex(0xFFFFFF)
                            }else{
                                highlightMesh.material.color.setHex(0xFF0000)
                            }
                            
                            i++;
                        }

                    }
                })
            }    
        })

        
        //=====================================================================
        
        
        //------------------------
        // 클릭한 곳에 선반 생성
        const objects = this._object_arr;

        // 선반들의 정보를 담는 배열


        const group2 = new THREE.Group();
        // 기본 바 생성
        const shelfBarGeometry = new THREE.CylinderGeometry(0.03,0.03,shelf_floor-1+0.2)
        const shelfBarMaterial = new THREE.MeshPhongMaterial({
            color : 0xffffff, emissive : 0x112244, flatShading:true
        })
        // 기본 판 생성
        const shelfFloorGeometry = new THREE.BoxGeometry(shelf_width,0.05,shelf_length)
        const shelfFloorMaterial = new THREE.MeshPhongMaterial({
            color : 0xffffff, emissive : 0x112244, flatShading:true
        })

        for(let i=0;i<4;i++){
            // 바생성
            const shelfBarMesh =new THREE.Mesh(shelfBarGeometry,shelfBarMaterial);
            let x = 1;
            let z = 1;
            if(i==1){
                z=-1;
            }else if(i==2){
                x=-1;
                z=-1;
            }else if(i==3){
                x=-1;
            }
            shelfBarMesh.position.x = shelf_width/2*x;
            shelfBarMesh.position.y = 1/2*(shelf_floor-2)+(0.6);
            shelfBarMesh.position.z = 1/2*z*shelf_length;
            group2.add(shelfBarMesh);
        }
        for(let i=0;i<shelf_floor;i++){
            // 판 생성
            const shelfFloorMesh = new THREE.Mesh(shelfFloorGeometry,shelfFloorMaterial)
            shelfFloorMesh.position.y = (i*1)+0.1;
            group2.add(shelfFloorMesh);
        }

        // 선반 버튼 회전 기능
        window.addEventListener('contextmenu',function(){
            if(rotation==true){
                rotation = false
                send_rotation = "y"
                highlightMesh.rotation.z = -Math.PI/2;
                group2.rotation.y =-Math.PI/2;

            }else{
                rotation =true
                send_rotation = "n"
                highlightMesh.rotation.z = 0
                group2.rotation.y =0

            }
        })


        // 마우스 호버 이벤트 넣기
        this._scene.add(highlightMesh)

        
        window.addEventListener('dblclick',function(){
            const objectExist = objects.find(function(object){
                return(object.position.x === highlightMesh.position.x)
                && (object.position.z === highlightMesh.position.z)
            })
            
            if(!objectExist){
                intersects.forEach(function(intersect){
                    if(intersect.object.name === 'shelf_ground'){
                        // const shelfClone = group2.clone();
                        // shelfClone.position.copy(highlightMesh.position);
                        // console.log(highlightMesh.position)
                        // hover_scene.add(shelfClone);
                        // objects.push(shelfClone)
                        console.log(highlightMesh.position)
                        // group2.name = prompt("선반의 이름을 정해주세요");

                        // shelf_info.push({num:wh_name_arr[0],x:shelfClone.position.x,y:shelfClone.position.y,z:shelfClone.position.z,rotation:send_rotation,width:shelf_width,
                        //     length:shelf_length,floor:shelf_floor,name:group2.name})
                            
                            
                    }
                })
            }

        })

        //------------------------


    }




    // 창의 크기가 변경될때 발생하는 이벤트
    resize(){
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width,height);
    }
    
    // time : 렌더링이 처음 시작된 이후 경과된 시간(ms 단위)
    // time은 requestAnimationFrame 함수가 render함수에 전달해준 값이다
    render(time){
        // 랜더링 시에 scene을 카메라의 시점으로 렌더링하도록 만드는 장치
        this._renderer.render(this._scene, this._camera);
        // 속성값을 변경시켜 애니메이션 효과를 만드는 장치
        this.update(time);
        requestAnimationFrame(this.render.bind(this));
    }
    update(time){
        time *= 0.001;  // 알아보기 쉽게 ms단위를 초단위로 변경
    }

}

window.onload = function(){
    new App();
}


function saveShelf(){

    let url = "/saveShelf"

    for(let i = 0;i<shelf_info.length;i++){

        axios
        .post(url, JSON.stringify(shelf_info[i]),{
            headers: {
                "Content-Type": `application/json`,
            },
        })
        .then((res) => {
            console.log(res);
        })
        .catch(() => {
            console.log("catch");
        });
    }

}
// const btn_create = document.getElementById('btn_create')
// btn_create.addEventListener('click',()=>{
//     saveShelf()
//     location.href = "http://localhost:3002/warehouse"
// })










