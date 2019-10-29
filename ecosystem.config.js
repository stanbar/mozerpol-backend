module.exports = {
  apps : [{
    name: 'mozerpol',
    script: 'bin/www',

    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
  }],
};
