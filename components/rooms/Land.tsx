import { FC, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Refreshable } from "../Refreshable";

interface IProps {
  xrpl: any;
}
export const Land: FC<IProps> = ({ xrpl }) => {
  const ref = useRef<Refreshable>();
  // mainCanvas.width = 3 * plots + 4 * roads;
  // mainCanvas.height = 3 * plots + 4 * roads;
  // plotCanvas.width = plots;
  // plotCanvas.height = plots;
  const tiles = 12;
  const plots = tiles * 9;
  const roads = tiles * 2;
  const initialOffsets = plots + roads;
  const plotViewOffsets = plots + 2 * roads;
  const [cursorEvent, setCursorEvent] = useState(null);
  const [plotSize, setPlotSize] = useState({
    width: tiles * 9,
    height: tiles * 9,
  });
  useEffect(() => {
    if (window) {
      window.addEventListener("keydown", (e) => {
        setCursorEvent(e);
      });
    }
  }, []);

  useEffect(() => {
    console.log("🚀 ~ file: Land.tsx ~ line 33~ plotContext", xrpl);
    if (cursorEvent) {
      move(cursorEvent.key);
    }
  }, [cursorEvent, xrpl]);

  const handleRefresh = useCallback(() => {
    //ref.current && ref.current.refresh()
  }, [ref.current]);

  const mainCtxRef = useRef<HTMLCanvasElement>(null);
  const plotCtxRef = useRef<HTMLCanvasElement>(null);
  // const canvasMain = mainCtxRef?.current;
  // const canvasPlot = plotCtxRef?.current;
  const [mainContext, setMainContext] = useState(null);
  const [plotContext, setPlotContext] = useState(null);
  const [room, setRoom] = useState("");
  const [plotID, setPlotID] = useState("");
  const [landSize, setLandSize] = useState({
    width: 3 * plots + 4 * roads,
    height: 3 * plots + 4 * roads,
  });
  const [plotView, setPlotView] = useState({
    plotX: 0,
    plotY: 0,
    locationX: 0,
    locationY: 0,
  });

  const [mapView, setMapView] = useState({
    mapOffsetX: -1 * initialOffsets,
    mapOffsetY: -1 * initialOffsets,
  });

  const [worldImage, setWorldImage] = useState({} as CanvasImageSource);

  useEffect(() => {
    const canvas = mainCtxRef.current;
    const context: CanvasRenderingContext2D = canvas?.getContext("2d")!;
    setMainContext(context);

    const canvasPlot = plotCtxRef?.current;
    const ctxPlot: CanvasRenderingContext2D = canvasPlot?.getContext("2d")!;
    console.log("🚀 ~ file: Land.tsx ~ line 124 ~ plotContext", plotContext);
    setPlotContext(ctxPlot);
  }, []);
  useEffect(() => {
    const createImg = async () => {
      if (mainContext) {
        console.log(
          "🚀 ~ file: Land.tsx ~ line 124 ~ mainContext",
          mainContext
        );
        mainContext.beginPath();
        //context.arc(50, 50, 50, 0, 2 * Math.PI);
        const image = new Image();
        //var image = document.createElement("img");

        // const image = document.createElement("IMG") as Image;
        // image.onload = drawImageActualSize;

        image.onload = () => {
          mainContext?.drawImage(image, 0, 0);
        };
        image.src = "maps/MetaverseLand.png";
        setWorldImage(image);
        //context.fill();

        if (plotContext) {
          initializeMap(mainContext, plotContext);
        }
      }
    };
    createImg();
  }, [mainContext, plotContext]);

  useEffect(() => {
    console.log("plotView :>> ", plotView);
    if (xrpl) {
      const hash = xrpl?.convertStringToHex(JSON.stringify(plotView));
      setPlotID(hash); // "hash" //ethers.utils.id(JSON.stringify(plotView));
      console.log(
        "🚀 ~ file: Land.tsx ~ line 227 ~ setPlotData ~ setPlotID",
        plotID
      );
      handleRoom(hash);
      isPlotAssignable(hash);
    }
  }, [xrpl, plotView]);

  const setPlotData = () => {
    if (xrpl) {
      const hash = xrpl?.convertStringToHex(JSON.stringify(plotView));
      setPlotID(hash); // "hash" //ethers.utils.id(JSON.stringify(plotView));
      console.log(
        "🚀 ~ file: Land.tsx ~ line 227 ~ setPlotData ~ setPlotID",
        plotID
      );
      handleRoom(hash);
      isPlotAssignable(hash);
      localStorage.setItem("selected-room", room);
    }
  };
  const assignPlot = async () => {
    // const plotID = document.getElementById("plotID") as HTMLInputElement | null;
    // PlotX: document.getElementById("plotX");
    // const assigned = await isPlotAssigned(plotID?.value);
    // console.log(
    //   "🚀 ~ file: logic.js ~ line 164 ~ assignPlot ~ assigned",
    //   assigned
    // );
    // if (!assigned) {
    //   const metadata = {
    //     PlotID: plotID?.value,
    //     PlotX: document.getElementById("plotX").value,
    //     PlotY: document.getElementById("plotY").value,
    //     LocationX: document.getElementById("locationX").value,
    //     LocationY: document.getElementById("locationX").value,
    //     image:
    //       "https://moralis.io/wp-content/uploads/2021/06/Moralis-Glass-Favicon.svg",
    //   };
    // const metadataFile = new Moralis.File("metadata.json", { base64: btoa(JSON.stringify(metadata)) });
    // await metadataFile.saveIPFS();
    // const metadataURI = metadataFile.ipfs();
    // await mint(metadataURI);
    // } else {
    //   displayMessage("01", "Plot is already assigned");
    // }
  };
  const enterChat = useCallback(() => handleRefresh(), []);
  const leaveChat = useCallback(() => handleRefresh(), []);
  const mintToken = useCallback(() => handleRefresh(), []);
  // const canvasPlot = plotCtxRef.current;
  // const contextPlot = canvasPlot?.getContext("2d");

  //contextPlot.beginPath();
  //   // contextPlot.arc(50, 50, 50, 0, 2 * Math.PI);
  //   // contextPlot.fill();
  // }

  const unassignables = {
    "7B22706C6F7458223A302C22706C6F7459223A302C226C6F636174696F6E58223A3238382C226C6F636174696F6E59223A3238387D":
      "Land1",
    "7B22706C6F7458223A312C22706C6F7459223A302C226C6F636174696F6E58223A3432302C226C6F636174696F6E59223A3238387D":
      "Land2",
    "7B22706C6F7458223A322C22706C6F7459223A302C226C6F636174696F6E58223A3535322C226C6F636174696F6E59223A3238387D":
      "Land3",
    "7B22706C6F7458223A332C22706C6F7459223A302C226C6F636174696F6E58223A3638342C226C6F636174696F6E59223A3238387D":
      "Land4",
    "7B22706C6F7458223A342C22706C6F7459223A302C226C6F636174696F6E58223A3831362C226C6F636174696F6E59223A3238387D":
      "Land5",
    "7B22706C6F7458223A352C22706C6F7459223A302C226C6F636174696F6E58223A3934382C226C6F636174696F6E59223A3238387D":
      "Land6",
    "7B22706C6F7458223A302C22706C6F7459223A312C226C6F636174696F6E58223A3238382C226C6F636174696F6E59223A3432307D":
      "Land7",
    "7B22706C6F7458223A312C22706C6F7459223A312C226C6F636174696F6E58223A3432302C226C6F636174696F6E59223A3432307D":
      "Land8",
    "7B22706C6F7458223A322C22706C6F7459223A312C226C6F636174696F6E58223A3535322C226C6F636174696F6E59223A3432307D":
      "Land9",
    "7B22706C6F7458223A332C22706C6F7459223A312C226C6F636174696F6E58223A3638342C226C6F636174696F6E59223A3432307D":
      "Land10",
    "7B22706C6F7458223A342C22706C6F7459223A312C226C6F636174696F6E58223A3831362C226C6F636174696F6E59223A3432307D":
      "Land11",
  };

  //web3 constants
  const contractAddress = ""; //your own contract

  //canvas drawing functions
  function drawCanvas() {}

  function initializeMap(main, plot) {
    const canvas = mainCtxRef?.current;
    const canvasPlot = plotCtxRef?.current;
    updatePlotLocation();
    setPlotData();
    // if (mainContext && plotContext) {
    drawMapSection(main, mapView.mapOffsetX, mapView.mapOffsetY);
    drawCursor(plotViewOffsets, plotViewOffsets);
    drawMapSection(plot, -1 * plotView.locationX, -1 * plotView.locationY);
    // }
  }

  //animate functions
  function move(direction) {
    const validMove = validateMove(direction);
    if (validMove) {
      const canvas = mainCtxRef?.current;
      const canvasPlot = plotCtxRef?.current;
      updateView(direction);
      updatePlotLocation();
      drawCursor(mapView.mapOffsetX, mapView.mapOffsetY);
      drawMapSection(mainContext, mapView.mapOffsetX, mapView.mapOffsetY);
      drawMapSection(
        plotContext,
        -1 * plotView.locationX,
        -1 * plotView.locationY
      );
      setPlotData();
    }
  }

  function validateMove(direction) {
    switch (direction) {
      case "ArrowRight":
        return !(plotView.plotX == 5);
      case "ArrowUp":
        return !(plotView.plotY == 0);
      case "ArrowLeft":
        return !(plotView.plotX == 0);
      case "ArrowDown":
        return !(plotView.plotY == 5);
    }
  }
  const handleKeyDown = (e: any) => {
    console.log("🚀 ~ file: Land.tsx ~ line 228 ~ handleKeyDown ~ e", e);
    console.log(e.key);
  };

  function updateView(direction) {
    const plot = plotView;
    const map = mapView;
    switch (direction) {
      case "ArrowRight":
        plot.plotX += 1;
        map.mapOffsetX -= plots + roads;
        setMapView(map);
        setPlotView(plot);
        break;
      case "ArrowDown":
        plot.plotY += 1;
        map.mapOffsetY -= plots + roads;
        setMapView(map);
        setPlotView(plot);
        break;
      case "ArrowLeft":
        plot.plotX -= 1;
        map.mapOffsetX += plots + roads;
        setMapView(map);
        setPlotView(plot);
        break;
      case "ArrowUp":
        plot.plotY -= 1;
        map.mapOffsetY += plots + roads;
        setMapView(map);
        setPlotView(plot);
        break;
    }
  }

  function drawMapSection(ctx: CanvasRenderingContext2D, originX, originY) {
    ctx?.drawImage(worldImage as CanvasImageSource, originX, originY);
  }

  function drawCursor(x, y) {
    mainCtxRef?.current?.getContext("2d").strokeRect(x, y, plots, plots);
  }

  function updatePlotLocation() {
    const plot = plotView;
    console.log(
      "🚀 ~ file: Land.tsx ~ line 269 ~ updatePlotLocation ~ plot",
      plot
    );
    plot.locationX = -1 * mapView.mapOffsetX + plotViewOffsets;
    plot.locationY = -1 * mapView.mapOffsetY + plotViewOffsets;
    setPlotView(plot);
  }

  //UI Functions

  function handleRoom(plotID) {
    setRoom(unassignables[plotID]);
  }

  function isPlotAssignable(plotID) {
    const _unassignable = Object.keys(unassignables).includes(plotID);
    console.log(
      "🚀 ~ file: logic.js ~ line 138 ~ isPlotAssignable ~ _unassignable",
      _unassignable
    );
    // if (_unassignable) {
    //     document.getElementById("claimButton").setAttribute("disabled", null);
    // }
    // else {
    //     document.getElementById("claimButton").removeAttribute("disabled");
    // }
  }

  function displayMessage(messageType, message) {
    const messages = {
      "00": `<div class= "alert alert-success"> ${message} </div>`,
      "01": `<div class= "alert alert-danger"> ${message} </div>`,
    };
    document.getElementById("notifications").innerHTML = messages[messageType];
  }

  //web3 Functions
  // async function login() {
  //     Moralis.Web3.authenticate().then(async function () {
  //         const chainIdHex = await Moralis.switchNetwork("0x13881");
  //     });
  // }

  async function mint(_tokenURI) {
    const contractOptions = {
      contractAddress: contractAddress,
      abi: "contractABI",
      functionName: "assign",
      params: {
        tokenURI: _tokenURI,
        bytesId: plotID,
      },
    };
    try {
      // const transaction = await Moralis.executeFunction(contractOptions);
      // await transaction.wait();
      // displayMessage("00", "Transaction confirmed with hash " + transaction.hash);
    } catch (error) {
      displayMessage("01", "Transaction reverted see console for details");
      console.log(error);
    }
  }

  async function isPlotAssigned(plotID) {
    const contractOptions = {
      contractAddress: contractAddress,
      abi: "contractABI",
      functionName: "exist",
      params: {
        bytesId: plotID,
      },
    };
    return true;
  }

  return (
    <>
      <main id="land-page">
        <div className="container mt-5">
          <div className="row">
            <h1 className="display-1 text-center text-success"> Xrp Land</h1>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="text-center bg-success text-white">
                <h1>Map</h1>
              </div>

              <div id="MainCanvasDiv" className="text-center">
                <canvas
                  ref={mainCtxRef}
                  height={landSize.height}
                  width={landSize.width}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="text-center bg-success text-white">
                <h1
                  id="current-land"
                  className="text-center bg-success text-white"
                >
                  Current Land
                </h1>
              </div>
              <div id="PlotCanvasDiv" className="claim-container">
                <canvas
                  onClick={() => enterChat()}
                  ref={plotCtxRef}
                  height={plotSize.height}
                  width={plotSize.width}
                />

                <div>
                  <button
                    className="btn btn-success btn-block btn-lg"
                    id="claimButton"
                    onClick={() => assignPlot()}
                  >
                    Claim
                  </button>
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text">Plot ID</span>
                  <div className="form-control">{unassignables[plotID]}</div>
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text">Plot ID</span>
                  <div className="form-control">{plotID}</div>
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text">Plot Coordinates</span>
                  <div className="form-control">{plotView.plotX}</div>

                  <div className="form-control">{plotView.plotY}</div>
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text">Location Coordinates</span>
                  <div className="form-control">{plotView.locationX}</div>

                  <div className="form-control">{plotView.locationY}</div>
                </div>
                <div className="row">
                  <button
                    className="btn btn-success btn-block btn-lg"
                    id="claimButton"
                    onClick={() => assignPlot()}
                  >
                    Claim
                  </button>
                </div>
              </div>
              <button
                className="btn btn-success btn-block btn-lg"
                onClick={() => mintToken()}
              >
                Mint NFT
              </button>
            </div>
            <hr />
            <div className="row">
              <div className="text-center bg-success text-white">
                <h1>Notifications</h1>
              </div>
              <div id="notifications" className="container mt-2"></div>
              <HideImg className="img-example">
                <img src="maps/MetaverseLand.png" id="img-example" />
              </HideImg>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const HideImg = styled.div`
  display: none;
`;
