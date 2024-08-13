import React, { useState, useEffect } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import Toggle from 'react-toggle';
import "react-toggle/style.css"

//Components
import Accessorize from './Accessorize';
import AlpacaArt from './AlpacaArt';
import Style from './Style';
import Header from './Header';
import Random from './Random';
import Download from './Download';

//Utils
import { alpacaConfig } from '../utils/alpacaConfig';
import { getImage } from '../utils/getImage';

const Alpaca = () => {
  const [config, setConfig] = useState(alpacaConfig);
  const [features, setFeatures] = useState({
    neck: null,
    ears: null,
    hair: null,
    eyes: null,
    leg: null,
    mouth: null,
    nose: null,
    backgrounds: null,
    accessories: null,
  });
  const [currentFeature, setCurrentFeature] = useState(config[0]);
  const [isDark, setIsDark] = useState(false);

  const changeImage = (feature, attribute) => {
    const { directory: dir } = feature;
    const { filename: bgImage } = attribute;

    const updatedConfig = config.map((ft) => ({
      ...ft,
      items: ft.items.map((item) => ({ ...item, selected: item === attribute })),
    }));

    setConfig(updatedConfig);

    getImage(dir, bgImage, (image) => {
      setFeatures((prevFeatures) => ({ ...prevFeatures, [dir]: image }));
    });
  };

  const setFeatureItem = (feature) => {
    setConfig((prevConfig) =>
      prevConfig.map((ft) => ({
        ...ft,
        selected: ft === feature,
      }))
    );
    setCurrentFeature(feature);
  };

  const downloadImage = () => {
    const alpacaCanvasNode = document.getElementById('alpaca');
    toPng(alpacaCanvasNode).then((dataUrl) => {
      download(dataUrl, 'my-alpaca.png');
    });
  };

  useEffect(() => {
    const renderAlpaca = () => {
      config.forEach((feature) => {
        const attribute = feature.items.find((at) => at.filename === 'default');
        changeImage(feature, attribute);
      });
    };
    renderAlpaca();
  
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [config, changeImage, isDark]);

  const setRandomItems = () => {
    const configClone = [...config];

    configClone.forEach((feature) => {
      const randomIndex = Math.floor(Math.random() * feature.items.length);
      const randomAttribute = feature.items[randomIndex];

      feature.items.forEach((attr) => (attr.selected = false));
      randomAttribute.selected = true;

      changeImage(feature, randomAttribute);
    });

    setConfig(configClone);
  };

  const alpacaAttr = features;

  return (
    <div className="alpaca-container">
      <div className="header">
        <Header />
        <Toggle
          checked={isDark}
          onChange={({ target }) => setIsDark(target.checked)}
          icons={{ checked: "🌙", unchecked: "🔆" }}
          aria-label="Dark mode toggle"
        />
      </div>
      <div className='inner'>
        <div className='left'>
          <div className='alpaca' id='alpaca'>
            <AlpacaArt attr={alpacaAttr} />
          </div>
          <Random handleRandom={setRandomItems}/>
          <Download handleDownload={downloadImage} />
        </div>
        <div className='right'>
          <h2 className='heading'>Accessorize your Alpaca</h2>
          <div className="acc-btn-wrapper">
            {config.map((attributes) => (
              attributes.label !== 'Nose' &&
              <Accessorize
                key={attributes.id}
                attributes={attributes}
                setFeatureItem={setFeatureItem}
              />
            ))}
          </div>
          <Style key={currentFeature.id} attributes={currentFeature} changeImage={changeImage} />
        </div>
      </div>
    </div>
    
  );
};

export default Alpaca;
