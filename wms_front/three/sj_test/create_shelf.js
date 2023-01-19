import * as THREE from "../build/three.module.js";
import { OrbitControls } from "../examples/jsm/controls/OrbitControls.js"

const shelf_info = [];

let sto_wh_name = localStorage.getItem('wh_name')
let sto_wh_width = localStorage.getItem('wh_width')
let sto_wh_length = localStorage.getItem('wh_length')
let sto_shelf_name = localStorage.getItem('shelf_name')
let sto_shelf_x = localStorage.getItem('shelf_x')
let sto_shelf_z = localStorage.getItem('shelf_z')
let sto_shelf_width = localStorage.getItem('shelf_width')
let sto_shelf_length = localStorage.getItem('shelf_length')
let sto_shelf_floor = localStorage.getItem('shelf_floor')
let sto_shelf_rotation = localStorage.getItem('shelf_rotation')

let wh_name_arr = sto_wh_name.split(",").map(Number)
let wh_width_arr = sto_wh_width.split(",").map(Number)
let wh_length_arr = sto_wh_length.split(",").map(Number)
let shelf_name_arr = sto_shelf_name.split(",")
let shelf_x_arr = sto_shelf_x.split(",").map(Number)
let shelf_z_arr = sto_shelf_z.split(",").map(Number)
let shelf_width_arr = sto_shelf_width.split(",").map(Number)
let shelf_length_arr = sto_shelf_length.split(",").map(Number)
let shelf_floor_arr = sto_shelf_floor.split(",").map(Number)
let shelf_rotation_arr = sto_shelf_rotation.split(",")

let shelf_width = Number(prompt("생성할 선반의 너비를 입력하세요"))
let shelf_length = Number(prompt("생성할 선반의 길이를 입력하세요"))
let shelf_floor = Number(prompt("생성할 선반의 층을 입력하세요"))

class App{
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;
        const renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setPixelRatio(window.devicePixelRatio);
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;


        const scene = new THREE.Scene();
        this._scene = scene;

        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();

        window.onresize = this.resize.bind(this);
        this.resize();

        requestAnimationFrame(this.render.bind(this));
    }
     _setupControls(){
        new OrbitControls(this._camera, this._divContainer);
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

    }

    _bringShelves(){

        for(let i=0; i<shelf_name_arr.length;i++){
            this._bringShelf({name:shelf_name_arr[i],x:shelf_x_arr[i],z:shelf_z_arr[i],width:shelf_width_arr[i],length:shelf_length_arr[i],floor:shelf_floor_arr[i],rotation:shelf_rotation_arr[i]})
        }
        // this._bringShelf({name:"A선반",x:i,z:0,width:1,length:5,floor:3,rotation:"y"})
    }
    _bringShelf(item){
        const shelf_group = new THREE.Group();
        // 기본 바 설정
        const BarGeometry = new THREE.CylinderGeometry(0.03,0.03,item.width*item.floor-1+0.2)
        const BarMaterial = new THREE.MeshPhongMaterial({
            color : 0xffffff, emissive : 0x112244, flatShading:true
        })
        // 기본 판 설정
        const FloorGeometry = new THREE.BoxGeometry(item.width, 0.05,item.width*item.length)
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
            BarMesh.position.y = item.width/2*(item.floor-2)+(0.6);
            BarMesh.position.z = item.width/2*z*item.length;
            shelf_group.add(BarMesh)
        }
        for(let i=0;i<item.floor;i++){
            // 판 생성
            const FloorMesh = new THREE.Mesh(FloorGeometry,FloorMaterial)
            FloorMesh.position.y = (i*1)+0.1;
            shelf_group.add(FloorMesh);
        }
        if(item.rotation == "y"){
            shelf_group.rotation.y = -Math.PI/2;
        }
        shelf_group.position.set(item.x,0,item.z)
        shelf_group.name = item.name;
        this._shelf = shelf_group;
        this._scene.add(shelf_group)
    }   

    _createShelf(){
  

        let rotation  = true;

         //=====================================================================
        // 하이라이트 모양과 위치 잡기 

        const highlightMesh = new THREE.Mesh(
            new THREE.PlaneGeometry(shelf_width,shelf_length),
            new THREE.MeshBasicMaterial({
                side : THREE.DoubleSide
            })
        )
        highlightMesh.position.set(0.5,0,0.5)
        highlightMesh.rotation.x = -Math.PI/2;

        if(rotation==true){
            
        }

        
        
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
            intersects.forEach(function(intersect){
                if(intersect.object.name === 'ground'){
                    const highlightPos = new THREE.Vector3().copy(intersect.point).floor().addScalar(0.5);
                    highlightMesh.position.set(highlightPos.x,0,highlightPos.z)
                
                
                    const objectExist = objects.find(function(object){
                        return(object.position.x === highlightMesh.position.x)
                        && (object.position.z === highlightMesh.position.z)
                    })
                    if(!objectExist){
                        highlightMesh.material.color.setHex(0xFFFFFF)
                    }else{
                        highlightMesh.material.color.setHex(0xFF0000)
                    }
                
                }
            })
        })

        
        //=====================================================================
        
        
        //------------------------
        // 클릭한 곳에 선반 생성
        const objects = [];

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
                highlightMesh.rotation.z = -Math.PI/2;
                group2.rotation.y =-Math.PI/2;

            }else{
                rotation =true
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
                    if(intersect.object.name === 'ground'){
                        const shelfClone = group2.clone();
                        shelfClone.position.copy(highlightMesh.position);
                        // console.log(highlightMesh.position)
                        hover_scene.add(shelfClone);
                        objects.push(shelfClone)

                        group2.name = prompt("선반의 이름을 정해주세요");

                        shelf_info.push({num:wh_name_arr[0],x:shelfClone.position.x,y:shelfClone.position.y,z:shelfClone.position.z,rotation:rotation,width:shelf_width,
                            length:shelf_length,floor:shelf_floor,name:group2.name})
                            
                            
                    }
                })
            }
            // console.log(hover_scene.children)

            console.log(shelf_info)
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
const btn_create = document.getElementById('btn_create')
btn_create.addEventListener('click',()=>{
    saveShelf()
    location.href = "http://localhost:3002/warehouse"
})










