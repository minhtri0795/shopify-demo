type DecorateLineProps = {
  type: 1 | 2 | 3 | 4;
  className?: string;
};

const DecorateLine: React.FC<DecorateLineProps> = ({
  type,
  className,
  ...props
}) => {
  const renderSVG = () => {
    switch (type) {
      case 1:
        return (
          <svg
            width="268"
            height="148"
            viewBox="0 0 268 148"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M241.596 109.677C241.596 118.809 241.596 139.4 257.04 146.208C258.202 146.706 266.713 149.197 268 143.343V137.615C268.01 136.583 267.671 135.579 267.038 134.765C266.405 133.951 265.515 133.375 264.513 133.131C258.783 131.637 256.209 124.829 256.209 109.677C256.209 91.66 252.058 78.5835 243.755 70.7791C240.812 68.0181 237.355 65.8638 233.579 64.4392C229.804 63.0147 225.785 62.3477 221.752 62.4766H219.717C211.86 63.0971 204.214 65.3298 197.258 69.0356C190.2 72.3566 187.668 73.1869 184.471 71.5264C180.32 69.1602 177.912 63.9296 174.217 54.9213C173.179 52.389 171.892 49.2341 170.439 46.0376C160.849 23.7868 137.725 0 103.682 0C55.7322 0 25.8827 33.0026 19.6139 92.9054C17.5382 112.79 11.3108 129.021 3.63051 134.211L2.55107 134.958C1.27577 135.877 0.401483 137.25 0.108023 138.795C-0.185438 140.339 0.124236 141.937 0.973474 143.26L2.46809 145.419C3.37427 146.711 4.74878 147.599 6.29933 147.893C7.84988 148.188 9.45417 147.866 10.7711 146.996L11.8505 146.249C28.4566 134.999 32.9818 106.148 34.2273 94.2338C38.0467 57.9102 53.1167 14.6125 103.516 14.6125C130.501 14.6125 148.892 33.9574 157.071 51.9739C158.358 54.8383 159.479 57.5366 160.558 60.2764V60.484C164.71 70.281 168.322 79.4968 177.372 84.5199C187.502 90.0826 196.095 86.0558 203.651 82.4857C208.843 79.6268 214.565 77.8609 220.465 77.2966H221.835C224.455 77.2411 227.057 77.7361 229.474 78.7496V78.7496C230.381 79.1573 231.244 79.6581 232.048 80.2441H232.338C232.712 80.5346 233.085 80.7837 233.459 81.1158C238.898 86.3464 241.596 96.1019 241.596 109.677Z"
              fill="#C8B48C"
            />
          </svg>
        );
      case 2:
        return (
          <svg
            width="48"
            height="47"
            viewBox="0 0 48 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.046 4.3141e-05C19.2973 -0.00886447 14.6526 1.36183 10.6998 3.93862C6.74697 6.51541 3.66371 10.1825 1.84015 14.4757C0.0165943 18.769 -0.465283 23.4955 0.455564 28.057C1.37641 32.6185 3.65864 36.81 7.01327 40.1011C10.3679 43.3921 14.6442 45.6347 19.301 46.5451C23.9578 47.4555 28.7857 46.9928 33.1738 45.2155C37.5619 43.4382 41.313 40.4261 43.9522 36.5606C46.5914 32.6951 48 28.1498 48 23.5C48 17.2752 45.4778 11.3048 40.9868 6.89894C36.4959 2.49313 30.4032 0.011968 24.046 4.3141e-05ZM24.046 32.3688C22.2273 32.3688 20.4495 31.8407 18.9373 30.8514C17.4251 29.862 16.2466 28.4558 15.5506 26.8106C14.8546 25.1654 14.6724 23.355 15.0273 21.6084C15.3821 19.8618 16.2579 18.2575 17.5439 16.9983C18.8299 15.7391 20.4684 14.8816 22.2521 14.5342C24.0359 14.1868 25.8848 14.3651 27.565 15.0465C29.2452 15.728 30.6813 16.8821 31.6917 18.3627C32.7021 19.8434 33.2414 21.5842 33.2414 23.365C33.2414 25.753 32.2726 28.0431 30.5481 29.7316C28.8237 31.4202 26.4848 32.3688 24.046 32.3688Z"
              fill="#C8B48C"
            />
          </svg>
        );
      case 3:
        return (
          <svg
            width="241"
            height="82"
            viewBox="0 0 241 82"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M178.12 25.5163C193.835 30.1348 208.674 34.4647 226.467 34.4647H243.604C244.311 34.4695 245.012 34.3358 245.666 34.0713C246.321 33.8069 246.916 33.417 247.417 32.924C247.919 32.431 248.317 31.8446 248.589 31.1988C248.86 30.5529 249 29.8602 249 29.1606V26.8874C248.981 25.4869 248.403 24.1509 247.392 23.1707C246.381 22.1905 245.019 21.6458 243.604 21.6555H226.467C210.57 21.6555 197.299 17.7586 181.839 13.2122C154.95 4.42101 126.809 -0.0378541 98.4902 0.00612635C80.101 -0.144166 61.7953 2.47159 44.2002 7.76382C32.3583 11.4267 21.0463 16.5935 10.5469 23.1349C3.91106 27.2843 0.483843 31.5059 0.0463147 36.0523C-0.391214 40.5987 2.27035 45.4337 8.0676 50.7739C16.7759 58.953 26.7764 65.6686 37.6737 70.6552C55.162 78.4056 74.1531 82.2728 93.3128 81.985C108.556 82.1308 123.713 79.69 138.123 74.7686C147.814 71.4049 156.954 66.6515 165.25 60.6604C169.073 58.0797 171.971 54.3656 173.526 50.0522C174.617 46.7642 174.448 43.1943 173.052 40.0213C170.682 34.7894 165.14 32.1193 156.572 32.1193H80.7703C79.3488 32.1193 77.9855 32.6782 76.9803 33.6729C75.9752 34.6676 75.4105 36.0167 75.4105 37.4234V39.6966C75.4105 41.1034 75.9752 42.4525 76.9803 43.4472C77.9855 44.4419 79.3488 45.0007 80.7703 45.0007C81.3901 45.0007 142.535 45.0007 159.161 45.0007C159.529 44.9895 159.89 45.0957 160.192 45.3036C160.494 45.5116 160.721 45.8102 160.838 46.1553C160.984 46.4869 161.017 46.8566 160.932 47.2083C160.846 47.5601 160.647 47.8745 160.364 48.1038C153.325 54.0638 145.244 58.6986 136.519 61.779C122.712 66.7431 108.11 69.1882 93.4221 68.9954C50.1433 68.9954 26.8449 51.4594 16.8546 40.9956C16.4035 40.5128 16.0574 39.9433 15.8379 39.3226C15.6183 38.7019 15.53 38.0432 15.5785 37.3874C15.6559 36.7068 15.8819 36.0509 16.2408 35.4653C16.5996 34.8797 17.0828 34.3782 17.6568 33.9956C32.2411 24.3977 57.7636 12.9236 98.5631 12.9236C125.593 12.8762 152.454 17.128 178.12 25.5163Z"
              fill="#C8B48C"
            />
          </svg>
        );
      case 4:
        return (
          <svg
            width="164"
            height="120"
            viewBox="0 0 164 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M126.752 33.2397C123.456 50.0721 116.396 65.9544 106.093 79.7137C96.5685 91.8851 82.9976 100.297 67.8043 103.447C54.3075 106.056 40.5798 107.305 26.8303 107.174H26.4859C13.2349 107.377 0.00177002 106.127 -12.9731 103.447C-57.7347 92.8454 -79.3924 59.1954 -75.4328 6.0871V5.40316C-75.3813 4.73177 -75.4662 4.05695 -75.6824 3.41878C-75.8986 2.78061 -76.2418 2.19208 -76.6914 1.68813C-77.141 1.18417 -77.6879 0.77506 -78.2998 0.485073C-78.9117 0.195085 -79.5759 0.0301247 -80.2532 0H-82.4569C-83.737 0.0129415 -84.9659 0.500731 -85.9024 1.36758C-86.8389 2.23443 -87.4153 3.41771 -87.5183 4.68503V5.19799C-91.8912 64.2224 -66.3772 103.344 -15.6244 115.347C-1.34863 118.504 13.238 120.064 27.8632 119.998C42.5312 119.851 57.147 118.236 71.4886 115.176C80.3204 113.174 88.7484 109.706 96.4173 104.917C103.625 100.305 110.003 94.5256 115.286 87.8184C125.409 75.1655 133.087 58.2036 138.838 35.9071C143.004 19.6976 153.161 14.397 158.877 12.653C160.149 12.2752 161.263 11.4975 162.052 10.4367C162.84 9.37598 163.261 8.08959 163.25 6.77106V5.26637C163.231 4.55851 163.051 3.86405 162.725 3.23443C162.399 2.6048 161.934 2.05619 161.365 1.62921C160.796 1.20224 160.138 0.907869 159.439 0.767919C158.74 0.627968 158.018 0.646028 157.328 0.820752C153.299 1.88086 150.717 2.63319 149.615 3.07775C144.37 5.07813 139.733 8.38779 136.152 12.6872C131.435 18.7089 128.215 25.7502 126.752 33.2397Z"
              fill="#C8B48C"
            />
          </svg>
        );
    }
  };

  return (
    <div className={`hidden lg:block ${className}`} {...props}>
      {renderSVG()}
    </div>
  );
};

export default DecorateLine;
