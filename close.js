  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Inisialisasi jawaban
      const answers = { '1': null, '2': null, '3': null, '4': null, '5': null };

      // Definisi tipe kepribadian
      const personalities = {
        'A': { name: 'AKAN DIPENJARA', count: 0, color: '#e74c3c' },
        'B': { name: 'DIPOLISIKAN', count: 0, color: '#f39c12' },
        'C': { name: 'DITUNTUT', count: 0, color: '#3498db' },
        'D': { name: 'DIJADIKAN TERSANGKA', count: 0, color: '#9b59b6' }
      };

      // Deskripsi hasil
      const descriptions = {
        'A': 'Kamu adalah critical thinker yang berani menyuarakan kebenaran dengan data. Hati-hati, keberanianmu bisa membuatmu target penindasan.',
        'B': 'Kamu seorang aktivis dunia maya. Like dan repost-mu menyebarkan informasi dengan cepat, sehingga aparat bisa merasa terganggu.',
        'C': 'Kamu dituntut karena menyebarkan informasi yang dianggap menghasut. Padahal kritik adalah bagian dari demokrasi!',
        'D': 'Kamu aktivis sejati yang turun ke jalan dan mendokumentasikan perlawanan. Aksi langsungmu membuatmu target aparat.'
      };

      // Elemen DOM
      const progressFill = document.getElementById('progress-fill');
      const progressText = document.getElementById('progress-text');
      const questionContainers = document.querySelectorAll('.question-container');
      const resultContainer = document.getElementById('result-container');
      const personalityResult = document.getElementById('personality-result');
      const personalityDesc = document.getElementById('personality-desc');
      const restartBtn = document.getElementById('restart-btn');

      // Update progress bar
      function updateProgress(currentQuestion) {
        const progress = ((currentQuestion - 1) / 5) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Pertanyaan ${currentQuestion} dari 5`;
      }

      // Tampilkan pertanyaan
      function showQuestion(questionNumber) {
        questionContainers.forEach(c => c.classList.remove('active'));
        document.getElementById(`question-${questionNumber}`).classList.add('active');
        updateProgress(questionNumber);
      }

      // Pilih opsi
      function selectOption(questionNumber, optionElement, value) {
        document.querySelectorAll(`#question-${questionNumber} .option`).forEach(o => o.classList.remove('selected'));
        optionElement.classList.add('selected');
        answers[questionNumber] = value;
      }

      // Hitung hasil
      function calculateResults() {
        Object.keys(personalities).forEach(k => personalities[k].count = 0);

        Object.values(answers).forEach(answer => {
          if (answer && personalities[answer]) {
            personalities[answer].count++;
          }
        });

        const totalQuestions = 5;
        let maxPercentage = 0;
        let dominant = '';

        Object.keys(personalities).forEach(k => {
          const percentage = (personalities[k].count / totalQuestions) * 100;
          document.getElementById(`percent-${k}`).textContent = `${percentage}%`;
          document.getElementById(`bar-${k}`).style.width = `${percentage}%`;

          if (percentage > maxPercentage) {
            maxPercentage = percentage;
            dominant = k;
          }
        });

        personalityResult.textContent = personalities[dominant].name;
        personalityResult.style.background = `linear-gradient(to right, ${personalities[dominant].color}, #fdbb2d)`;
        personalityDesc.textContent = descriptions[dominant];
        resultContainer.style.display = 'block';
      }

      // Event listener opsi
      document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
          const qContainer = this.closest('.question-container');
          const qNumber = qContainer.id.split('-')[1];
          const value = this.getAttribute('data-value');
          selectOption(qNumber, this, value);
        });
      });

      // Navigasi antar pertanyaan
      document.getElementById('next-btn').addEventListener('click', () => showQuestion(2));
      document.getElementById('prev-btn-2').addEventListener('click', () => showQuestion(1));
      document.getElementById('next-btn-2').addEventListener('click', () => showQuestion(3));
      document.getElementById('prev-btn-3').addEventListener('click', () => showQuestion(2));
      document.getElementById('next-btn-3').addEventListener('click', () => showQuestion(4));
      document.getElementById('prev-btn-4').addEventListener('click', () => showQuestion(3));
      document.getElementById('next-btn-4').addEventListener('click', () => showQuestion(5));
      document.getElementById('prev-btn-5').addEventListener('click', () => showQuestion(4));

      // Submit hasil
      document.getElementById('submit-btn').addEventListener('click', function() {
        const allAnswered = Object.values(answers).every(a => a !== null);
        if (allAnswered) {
          calculateResults();
        } else {
          alert('Silakan jawab semua pertanyaan sebelum melihat hasil!');
        }
      });

      // Restart tes
      restartBtn.addEventListener('click', function() {
        Object.keys(answers).forEach(k => answers[k] = null);
        document.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
        document.querySelectorAll('.bar-fill').forEach(b => b.style.width = '0%');
        document.querySelectorAll('[id^="percent-"]').forEach(el => el.textContent = '0%');
        resultContainer.style.display = 'none';
        showQuestion(1);
      });

      // Inisialisasi
      showQuestion(1);
    });
  </script>
</body>
</html>
