const takeTime = (index) => {
    switch (index) {
    case 1: {
    return '8:00';
    }
    case 2: {
    return '9:50';
    }
    case 3: {
    return '11:55';
    }
    case 4: {
    return '13:45';
    }
    case 5: {
    return '15:50';
    }
    case 6: {
    return '17:40';
    }
    case 7: {
    return '19:30';
    }
    default: {
    return undefined;
    }
  }
};

module.exports = takeTime;
